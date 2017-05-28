import models from '../models/';
import pagination from '../helpers/PaginationHelper';

const User = models.User;
const Document = models.Document;

export default {
  /**
  * @desc - Search the database for users
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Array} - Search results
  */
  searchUsers(req, res) {
    const searchQuery = req.query.q;
    const searchOptions = {
      where: {
        $or: [
          {
            name: {
              $iLike: `%${searchQuery}%`,
            }
          },
          {
            email: {
              $iLike: `%${searchQuery}%`,
            }
          }
        ]
      }
    };
    searchOptions.limit = req.query.limit > 0 ? req.query.limit : 12;
    searchOptions.offset = req.query.offset > 0 ? req.query.offset : 0;

    return User.findAndCountAll(searchOptions)
      .then((userMatches) => {
        const paginationInfo = pagination(searchOptions.limit,
        searchOptions.offset, userMatches.count);
        res.status(200).send({
          users: userMatches.rows,
          paginationInfo
        });
      })
      .catch(error => res.status(400).send(error.message));
  },


  /**
   * searhOwnDocuments - description
   *
   * @param  {type} req description
   * @param  {type} res description
   * @return {type}     description
   */
  searchOwnDocuments(req, res) {
    const searchQuery = req.query.q;
    const searchOptions = {};
    searchOptions.limit = req.query.limit > 0 ? req.query.limit : 12;
    searchOptions.offset = req.query.offset > 0 ? req.query.offset : 0;

    searchOptions.where = {
      $or: [
        {
          title: {
            $iLike: `%${searchQuery}%`,
          }
        },
        {
          content: {
            $iLike: `%${searchQuery}%`,
          }
        }
      ],
      $and: {
        documentOwnerId: req.user.id
      }
    };

    return Document.findAndCountAll(searchOptions)
      .then((documentMatches) => {
        const paginationInfo = pagination(searchOptions.limit,
        searchOptions.offset, documentMatches.count);
        res.status(200).send({
          documents: documentMatches.rows,
          paginationInfo
        });
      })
      .catch(error => res.status(400).send(error.message));
  },

  /**
  * @desc - Search the database for documents
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Array} - Search results
  */
  searchDocuments(req, res) {
    const searchQuery = req.query.q;
    const searchOptions = {};
    searchOptions.limit = req.query.limit > 0 ? req.query.limit : 12;
    searchOptions.offset = req.query.offset > 0 ? req.query.offset : 0;

    // Default value for a super admin. Can access all documents.
    searchOptions.where = {
      $or: [
        {
          title: {
            $iLike: `%${searchQuery}%`,
          }
        },
        {
          content: {
            $iLike: `%${searchQuery}%`,
          }
        }
      ]
    };
    /*
      Document access for admins.
      An admin can access all public documents, private and 'role' documents
      belonging to users with less privilege, and 'role' documents belonging
      to admins in addition to the admin's documents.
    */
    if (req.user.roleId === 2) {
      searchOptions.where = {
        $or: [
          {
            title: {
              $iLike: `%${searchQuery}%`,
            }
          },
          {
            content: {
              $iLike: `%${searchQuery}%`,
            }
          }
        ],
        $and: {
          $or: [
            { access: 'public' },
            { access: 'private',
              $not: {
                '$User.RoleId$': 1
              },
              $or: {
                '$User.id$': req.user.id,
                '$User.RoleId$': { $gt: 2 }
              }
            },
            { access: 'role',
              $not: {
                '$User.RoleId$': 1
              }
            },
          ]
        }
      };

      searchOptions.include = [
        {
          model: User,
          attributes: { exclude: ['password', 'privacy', 'RoleId'] }
        }
      ];
      /*
        Document access for regular users.
        Regular users can only access another user's documents if those
        documents are public or 'role'. They can access all their own
        documents
      */
    } else if (req.user.roleId > 2) {
      searchOptions.where = {
        $or: [
          {
            title: {
              $iLike: `%${searchQuery}%`,
            }
          },
          {
            content: {
              $iLike: `%${searchQuery}%`,
            }
          }
        ],
        $and: {
          $or: [
            { access: 'public' },
            { access: 'role',
              $and: {
                '$User.RoleId$': req.user.roleId
              }
            },
            { access: 'private',
              $and: {
                documentOwnerId: req.user.id
              }
            }
          ]
        }
      };

      searchOptions.include = [
        {
          model: User,
          attributes: { exclude: ['password', 'privacy', 'RoleId'] }
        }
      ];
    }

    return Document.findAndCountAll(searchOptions)
      .then((documentMatches) => {
        const paginationInfo = pagination(searchOptions.limit,
        searchOptions.offset, documentMatches.count);
        res.status(200).send({
          documents: documentMatches.rows,
          paginationInfo
        });
      })
      .catch(error => res.status(400).send(error.message));
  }
};

import models from '../models/';

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
    const searchQuery = req.query.search;
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

    return User.findAll(searchOptions)
      .then(userMatches => res.status(200).send(userMatches))
      .catch(error => res.send(error));
  },

  /**
  * @desc - Search the database for documents
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Array} - Search results
  */
  searchDocuments(req, res) {
    const searchQuery = req.query.search;
    const searchOptions = {};

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

    Document.findAll(searchOptions)
      .then(documentMatches => res.status(200).send(documentMatches))
      .catch(error => res.send(error));
  }
};

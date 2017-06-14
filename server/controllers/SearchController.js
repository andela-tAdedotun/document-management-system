import models from '../models/';
import pagination from '../helpers/PaginationHelper';

const User = models.User;
const Document = models.Document;


/**
 *
 */
class SearchController {
  /**
  * @desc - Search the database for users
  *
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Array} - Search results
  */
  static searchUsers(req, res) {
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

    searchOptions.attributes = { exclude: ['password'] };
    searchOptions.limit = req.query.limit > 0 ? req.query.limit : 12;
    searchOptions.offset = req.query.offset > 0 ? req.query.offset : 0;

    return User.findAndCountAll(searchOptions)
      .then((userMatches) => {
        const paginationInfo = pagination(searchOptions.limit,
        searchOptions.offset, userMatches.count);
        res.status(200).json({
          users: userMatches.rows,
          paginationInfo
        });
      })
      .catch(error => res.status(400).json({
        message: error.message
      }));
  }


  /**
   * searhOwnDocuments - description
   *
   * @param  {type} req description
   * @param  {type} res description
   * @return {type}     description
   */
  static searchOwnDocuments(req, res) {
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
        res.status(200).json({
          documents: documentMatches.rows,
          paginationInfo
        });
      })
      .catch(error => res.status(400).json({
        message: error.message
      }));
  }

  /**
  * @desc - Search the database for documents
  *
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Array} - Search results
  */
  static searchDocuments(req, res) {
    const searchQuery = req.query.q;
    const searchOptions = {};
    searchOptions.limit = req.query.limit > 0 ? req.query.limit : 12;
    searchOptions.offset = req.query.offset > 0 ? req.query.offset : 0;
    searchOptions.include = [
      {
        model: User,
        attributes: { exclude: ['password', 'privacy'] }
      }
    ];

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
    // Document access for admins.
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
                '$User.roleId$': 1
              },
              $or: {
                '$User.id$': req.user.id,
                '$User.roleId$': { $gt: 2 }
              }
            },
            { access: 'role',
              $not: {
                '$User.roleId$': 1
              }
            },
          ]
        }
      };

      searchOptions.include = [
        {
          model: User,
          attributes: { exclude: ['password', 'privacy'] }
        }
      ];
      // Document access for regular users.
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
                '$User.roleId$': req.user.roleId
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
          attributes: { exclude: ['password', 'privacy'] }
        }
      ];
    }

    return Document.findAndCountAll(searchOptions)
      .then((documentMatches) => {
        const paginationInfo = pagination(searchOptions.limit,
        searchOptions.offset, documentMatches.count);
        res.status(200).json({
          documents: documentMatches.rows,
          paginationInfo
        });
      })
      .catch(error => res.status(400).json({
        message: error.message
      }));
  }
}

export default SearchController;

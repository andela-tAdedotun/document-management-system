import models from '../models/';
import pagination from '../helpers/PaginationHelper';

const User = models.User;
const Document = models.Document;


/**
 *
 */
class DocumentController {
  /**
  * @desc - Creates a new document in the database
  *
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - Created document
  */
  static createDocument(req, res) {
    return Document
      .create({
        title: req.body.title,
        content: req.body.content,
        isProtected: req.body.isProtected,
        access: req.body.access,
        documentOwnerId: req.user.id
      })
      .then(document => res.status(201).json(document))
      .catch(error => res.status(400).json({
        message: error.message
      }));
  }

  /**
  * @desc - Gets all documents stored in database
  *
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - Found documents
  */
  static getDocuments(req, res) {
    const queryOptions = {};
    queryOptions.limit = req.query.limit > 0 ? req.query.limit : 12;
    queryOptions.offset = req.query.offset > 0 ? req.query.offset : 0;
    queryOptions.include = [
      {
        model: User,
        attributes: { exclude: ['password', 'privacy'] }
      }
    ];

    // Document access for super admins and admins.
    if (req.user.roleId === 1 || req.user.roleId === 2) {
      if (req.user.roleId === 2) {
        queryOptions.where = {
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
        };
      }

      return Document
        .findAndCountAll(queryOptions)
        .then((documents) => {
          const paginationInfo = pagination(queryOptions.limit,
          queryOptions.offset, documents.count);
          res.status(200).json({
            paginationInfo,
            documents: documents.rows,
          });
        })
        .catch(error => res.status(400).json({
          message: error.message
        }));
    }

    // Document access for regular users.
    queryOptions.where = {
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
    };

    return Document
      .findAndCountAll(queryOptions)
      .then((documents) => {
        const paginationInfo = pagination(queryOptions.limit,
        queryOptions.offset, documents.count);
        res.status(200).json({
          paginationInfo,
          documents: documents.rows
        });
      })
      .catch(error => res.status(400).json({
        message: error.message
      }));
  }

  /**
  * @desc - Find a particular document in the database
  *
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - The document the database is queried for
  */
  static findDocument(req, res) {
    const queryOptions = {};

    // Document access for super admins and admins.
    if (req.user.roleId === 1 || req.user.roleId === 2) {
      if (req.user.roleId === 2) {
        queryOptions.where = {
          id: req.params.id,
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

        queryOptions.include = [
          {
            model: User,
            attributes: { exclude: ['password', 'privacy', 'roleId'] }
          }
        ];
      } else {
        queryOptions.where = {
          id: req.params.id
        };
      }

      return Document
        .findOne(queryOptions)
        .then((document) => {
          document.increment('views');
          res.status(200).json(document);
        })
        .catch(error => res.status(400).json({
          error,
          message: 'Invalid parameters. Try again!'
        }));
    }

    // Document access for regular users.
    queryOptions.where = {
      id: req.params.id,
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

    queryOptions.include = [
      {
        model: User,
        attributes: { exclude: ['password', 'privacy', 'roleId'] }
      }
    ];

    return Document
      .findOne(queryOptions)
      .then((document) => {
        document.increment('views');
        res.status(200).json(document);
      })
      .catch(error => res.status(400).json({
        message: error.message
      }));
  }

  /**
  * @desc - Update a particular document in the database
  *
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - The updated document
  */
  static updateDocument(req, res) {
    const queryOptions = {};
    queryOptions.include = [
      {
        model: User,
        attributes: { exclude: ['password', 'privacy'] }
      }
    ];

    // Document update access for super admins and admins.
    if (req.user.roleId === 1 || req.user.roleId === 2) {
      if (req.user.roleId === 2) {
        queryOptions.where = {
          id: req.params.id,
          $and: {
            $or: [
              {
                $not: {
                  '$User.roleId$': 1
                },
                $or: {
                  '$User.id$': req.user.id,
                  '$User.roleId$': { $gt: 2 }
                }
              },
            ]
          }
        };

        queryOptions.include = [
          {
            model: User,
            attributes: { exclude: ['password', 'privacy', 'roleId'] }
          }
        ];
      } else {
        queryOptions.where = {
          id: req.params.id
        };
      }
    } else {
      // A regular user can only delete a document that belongs to them
      queryOptions.where = {
        id: req.params.id,
        $and: {
          documentOwnerId: req.user.id
        }
      };
    }

    return Document
      .findOne(queryOptions)
      .then(document =>
        document
          .update(req.body, { fields: Object.keys(req.body) })
          .then(updatedDocument => res.status(200).json(updatedDocument))
      )
      .catch(() => res.status(400).json({
        message: 'You do not have permission'
      }));
  }

  /**
  * @desc - Delete a particular document in the database
  *
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - -
  */
  static deleteDocument(req, res) {
    const queryOptions = {};

    // Document delete access for admins.
    if (req.user.roleId === 2) {
      queryOptions.where = {
        id: req.params.id,
        $and: {
          $or: [
            {
              $not: {
                '$User.roleId$': 1
              },
              $or: {
                '$User.id$': req.user.id,
                '$User.roleId$': { $gt: 2 }
              }
            },
          ]
        }
      };

      queryOptions.include = [
        {
          model: User,
          attributes: { exclude: ['password', 'privacy', 'roleId'] }
        }
      ];

      // A super admin can delete any document
    } else if (req.user.roleId === 1) {
      queryOptions.where = {
        id: req.params.id
      };
    } else {
      // A regular user can only delete a document that belongs to them
      queryOptions.where = {
        id: req.params.id,
        $and: {
          documentOwnerId: req.user.id
        }
      };
    }

    return Document
      .findOne(queryOptions)
      .then((document) => {
        if (document.isProtected) {
          return res.status(403).json({
            message: 'This document is protected. ' +
           'Change this in the settings to delete it.'
          });
        }

        return document
          .destroy()
          .then(() => res.status(200).json({
            message: 'Document deleted.'
          }));
      })
      .catch(() => res.status(400)
      .json({
        message: 'An error occurred. Check the parameters. ' +
        'Also, you may not have the permission to delete this document.'
      }));
  }
}

export default DocumentController;

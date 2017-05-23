import models from '../models/';
import pagination from '../helpers/PaginationHelper';

const User = models.User;
const Document = models.Document;

export default {
  /**
  * @desc - Creates a new document in the database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - Created document
  */
  createDocument(req, res) {
    return Document
      .create({
        title: req.body.title,
        content: req.body.content,
        isProtected: req.body.isProtected,
        access: req.body.access,
        documentOwnerId: req.user.id
      })
      .then(document => res.status(201).send(document))
      .catch(error => res.status(400).send(error));
  },

  /**
  * @desc - Gets all documents stored in database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - Found documents
  */
  getDocuments(req, res) {
    const queryOptions = {};
    queryOptions.limit = req.query.limit > 0 ? req.query.limit : 12;
    queryOptions.offset = req.query.offset > 0 ? req.query.offset : 0;

    /*
      Document access for super admins and admins.
      A super admin can access any document while an admin can access all
      public documents, private and 'role' documents belonging to users with
      less privilege, and 'role' documents belonging to admins in addition to
      the admin's documents.
    */
    if (req.user.roleId === 1 || req.user.roleId === 2) {
      if (req.user.roleId === 2) {
        queryOptions.where = {
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
        };

        queryOptions.include = [
          {
            model: User,
            attributes: { exclude: ['password', 'privacy', 'RoleId'] }
          }
        ];
      }

      return Document
        .findAndCountAll(queryOptions)
        .then((documents) => {
          const paginationInfo = pagination(queryOptions.limit,
          queryOptions.offset, documents.count);
          res.status(200).send({
            paginationInfo,
            documents: documents.rows,
          });
        });
    }

    /*
      Document access for regular users.
      Regular users can only access their own documents as well as
      all public documents and 'role' documents belonging to other regular
      users.
    */
    queryOptions.where = {
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
    };

    queryOptions.include = [
      {
        model: User,
        attributes: { exclude: ['password', 'privacy', 'RoleId'] }
      }
    ];

    return Document
      .findAndCountAll(queryOptions)
      .then((documents) => {
        const paginationInfo = pagination(queryOptions.limit,
        queryOptions.offset, documents.count);
        res.status(200).send({ paginationInfo,
          documents: documents.rows });
      });
  },

  /**
  * @desc - Find a particular document in the database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - The document the database is queried for
  */
  findDocument(req, res) {
    const queryOptions = {};

    /*
      Document access for super admins and admins.
      A super admin can access any document while an admin can access all
      public documents, private and 'role' documents belonging to users with
      less privilege, and 'role' documents belonging to admins in addition to
      the admin's documents.
    */
    if (req.user.roleId === 1 || req.user.roleId === 2) {
      if (req.user.roleId === 2) {
        queryOptions.where = {
          id: req.params.id,
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

        queryOptions.include = [
          {
            model: User,
            attributes: { exclude: ['password', 'privacy', 'RoleId'] }
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
          res.status(200).send(document);
        })
        .catch(() => res.status(400).send('Invalid parameters. Try again!'));
    }

    /*
      Document access for regular users.
      Regular users can only access their own documents as well as
      all public documents and 'role' documents belonging to other regular
      users.
    */
    queryOptions.where = {
      id: req.params.id,
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

    queryOptions.include = [
      {
        model: User,
        attributes: { exclude: ['password', 'privacy', 'RoleId'] }
      }
    ];

    return Document
      .findOne(queryOptions)
      .then((document) => {
        document.increment('views');
        res.status(200).send(document);
      })
      .catch(error => res.status(400).send(error));
  },

  /**
  * @desc - Update a particular document in the database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - The updated document
  */
  updateDocument(req, res) {
    const queryOptions = {};

    /*
      Document access for super admins and admins.
      A super admin can update any document while an admin can update any
      document belonging to a user with less privilege and their own documents.
    */
    if (req.user.roleId === 1 || req.user.roleId === 2) {
      if (req.user.roleId === 2) {
        queryOptions.where = {
          id: req.params.id,
          $and: {
            $or: [
              {
                $not: {
                  '$User.RoleId$': 1
                },
                $or: {
                  '$User.id$': req.user.id,
                  '$User.RoleId$': { $gt: 2 }
                }
              },
            ]
          }
        };

        queryOptions.include = [
          {
            model: User,
            attributes: { exclude: ['password', 'privacy', 'RoleId'] }
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
          .then(updatedDocument => res.status(200).send(updatedDocument))
      )
      .catch(() => res.status(400).send('You do not have permission'));
  },

  /**
  * @desc - Delete a particular document in the database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - -
  */
  deleteDocument(req, res) {
    const queryOptions = {};

    /*
      Document access for admins.
      An admin can delete any document belonging to a user with less privilege
      and their own documents.
    */
    if (req.user.roleId === 2) {
      queryOptions.where = {
        id: req.params.id,
        $and: {
          $or: [
            {
              $not: {
                '$User.RoleId$': 1
              },
              $or: {
                '$User.id$': req.user.id,
                '$User.RoleId$': { $gt: 2 }
              }
            },
          ]
        }
      };

      queryOptions.include = [
        {
          model: User,
          attributes: { exclude: ['password', 'privacy', 'RoleId'] }
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
          return res.status(403).send('This document is protected. ' +
           'Change this in the settings to delete it.');
        }

        return document
          .destroy()
          .then(() => res.status(200).send('Document deleted.'));
      })
      .catch(() => res.status(400)
      .send('An error occurred. Check the parameters.'));
  }
};

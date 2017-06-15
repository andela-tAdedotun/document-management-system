/**
 *
 */
class Helpers {

  /**
   * getUserDocuments - returns expected response when super admin requests a
   * user's documents
   *
   * @param  {type} res - response object from API call
   * @return {type}     expected response
   */
  static getUserDocuments(res) {
    return {
      documents:
      [
        { id: 1,
          title: 'Daddy Yo',
          content: 'Wizzy boy, make me dance...',
          isProtected: true,
          views: 0,
          access: 'private',
          createdAt: res.body.documents[0].createdAt,
          updatedAt: res.body.documents[0].updatedAt,
          documentOwnerId: 1
        },
        { id: 6,
          title: 'Mobile Computing',
          content:
  'Mobile has been much more of a challenge: while Android remains' +
  ' a brilliant strategic move, its dominance is rooted more in its ' +
  'business model than in its quality (that’s not to denigrate its ' +
  'quality in the slightest, particularly the fact that Android runs on ' +
  'so many different kinds of devices at so many different price points).',
          isProtected: false,
          views: 0,
          access: 'role',
          createdAt: res.body.documents[1].createdAt,
          updatedAt: res.body.documents[1].updatedAt,
          documentOwnerId: 1
        }
      ],
      paginationInfo: {
        totalCount: 2,
        currentPage: 1,
        pageCount: 1,
        pageSize: 2
      }
    };
  }

  /**
   * getAllRoles - returns expected response when super admin requests all roles
   *
   * @param  {type} res - response object from API call
   * @return {type}     expected response
   */
  static getAllRoles(res) {
    return [
      { id: 4,
        userRole: 'Content Creator',
        createdAt: res.body[0].createdAt,
        updatedAt: res.body[0].updatedAt,
      },
      { id: 3,
        userRole: 'Regular',
        createdAt: res.body[1].createdAt,
        updatedAt: res.body[1].updatedAt,
      },
      { id: 2,
        userRole: 'Admin',
        createdAt: res.body[2].createdAt,
        updatedAt: res.body[2].updatedAt,
      },
      { id: 1,
        userRole: 'Super Admin',
        createdAt: res.body[3].createdAt,
        updatedAt: res.body[3].updatedAt,
      }
    ];
  }
  /**
   * validDocResponse - returns expected response for document request
   *
   * @param  {type} res - response object from API call
   * @return {type}     expected response
   */
  static validDocResponse(res) {
    return {
      access: 'private',
      content: 'Wizzy boy, make me dance...',
      createdAt: res.body.createdAt,
      documentOwnerId: 1,
      id: 10,
      isProtected: true,
      title: 'Daddy Yo',
      updatedAt: res.body.createdAt,
      views: 0
    };
  }
  /**
   * getDocsWithLimitAndOffset - returns expected response for document request
   * with limit and offset
   *
   * @param  {type} res - response object from API call
   * @return {type}     expected response
   */
  static getDocsWithLimitAndOffset(res) {
    return [
      {
        User: {
          createdAt: res.body.documents[0].User.createdAt,
          email: 'taiwo.adedotun@andela.com',
          id: 1,
          name: 'Kiniun',
          roleId: 1,
          updatedAt: res.body.documents[0].User.updatedAt
        },
        access: 'private',
        content: 'Wizzy boy, make me dance...',
        createdAt: res.body.documents[0].createdAt,
        documentOwnerId: 1,
        id: 1,
        isProtected: true,
        title: 'Daddy Yo',
        updatedAt: res.body.documents[0].updatedAt,
        views: 0
      },
      {
        User: {
          createdAt: res.body.documents[1].User.createdAt,
          email: 'kehinde.adedotun@xyz.com',
          id: 3,
          name: 'Kehinde Adedotun',
          roleId: 2,
          updatedAt: res.body.documents[1].User.updatedAt
        },
        access: 'public',
        content: 'Yeah, when you no dey',
        createdAt: res.body.documents[1].createdAt,
        documentOwnerId: 3,
        id: 2,
        isProtected: false,
        title: 'Soweto Baby',
        updatedAt: res.body.documents[1].updatedAt,
        views: 0
      },
      {
        User: {
          createdAt: res.body.documents[2].User.createdAt,
          email: 'taiwo@xyz.com',
          id: 6,
          name: 'Ajanlekoko',
          roleId: 3,
          updatedAt: res.body.documents[2].User.updatedAt
        },
        access: 'private',
        content: 'I will show you the money o...',
        createdAt: res.body.documents[2].createdAt,
        documentOwnerId: 6,
        id: 3,
        isProtected: false,
        title: 'Dance',
        updatedAt: res.body.documents[2].updatedAt,
        views: 0
      }
    ];
  }
}

export default Helpers;

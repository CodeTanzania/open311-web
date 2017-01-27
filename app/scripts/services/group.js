'use strict';

/**
 * @ngdoc service
 * @name ng311.ServiceGroup
 * @description
 * # ServiceGroup
 * Factory in the ng311.
 */
angular
  .module('ng311')
  .factory('ServiceGroup', function ($http, $resource, Utils) {

    //create issue resource
    var ServiceGroup = $resource(Utils.asLink(['servicegroups', ':id']), {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
    });


    /**
     * @description find issue with pagination
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    ServiceGroup.find = function (params) {
      return $http.get(Utils.asLink('servicegroups'), {
          params: params
        })
        .then(function (response) {

          //map plain issue object to resource instances
          var groups = response.data.servicegroups.map(function (issue) {
            //create issue as a resource instance
            return new ServiceGroup(issue);
          });

          //return paginated response
          return {
            groups: groups,
            total: response.data.count
          };
        });
    };

    return ServiceGroup;
  });

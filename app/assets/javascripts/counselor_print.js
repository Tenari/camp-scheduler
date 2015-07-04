// client app
(function() {
  'use strict';

  angular
    .module('cpCounselorPrint', [])
    .controller('SchedulerController', SchedulerController);
  
  SchedulerController.$inject = [];

  function SchedulerController(){
    var vm = this;
    vm.kids = '';
    vm.kidsCSV = [];
    vm.counselors = '';
    vm.counselorsCSV = [];
    vm.readKidsCSV = readKidsCSV;
    vm.readCounselorsCSV = readCounselorsCSV;
    vm.cabinKids = cabinKids;
    vm.skillKids = skillKids;
    vm.printView = false;

    function readKidsCSV() {
      var csv = _.map(vm.kids.split('\n'), function(line){
        var arr = line.split(',');
        arr[4] = +arr[4];
        return arr;
      });

      csv = _.sortBy(csv, function(arr){
        return arr[4];
      });
      vm.kidsCSV = csv;
      return csv;
    }

    function readCounselorsCSV() {
      var csv = _.map(vm.counselors.split('\n'), function(line){
        var arr = line.split(',');
        return arr;
      });
      vm.counselorsCSV = csv;
      return csv;
    }

    function cabinKids(cabin) {
      return _.filter(vm.kidsCSV, function(arr){
        return arr[0].toLowerCase().match(cabin.toLowerCase());
      });
    }

    function skillKids(index, skillName){
      return _.filter(vm.kidsCSV, function(arr){
        return arr[5+index].toLowerCase().match(skillName.toLowerCase());
      });
    }
  }
})();

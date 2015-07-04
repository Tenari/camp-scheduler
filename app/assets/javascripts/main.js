// client app
(function() {
  'use strict';

  angular
    .module('cp', [])
    .controller('SchedulerController', SchedulerController);
  
  SchedulerController.$inject = [];

  function SchedulerController(){
    var vm = this;
    vm.getNumber = getNumber;
    vm.getCounselors = getCounselors;
    vm.scrambleCounselors = scrambleCounselors;
    vm.getKids = getKids;
    vm.kids = '';
    vm.counselors = [];
    vm.counselorCount = 0;
    vm.cabinCount = 0;

    function getNumber(n){
      return new Array(n);
    }

    function getCounselors(cabinIndex) {
      if (vm.counselorCount < vm.cabinCount * 2) {
        return vm.counselors[cabinIndex] + (vm.counselors[cabinIndex*2] ? ' and ' + vm.counselors[(cabinIndex*2)] : '');
      } else {
        return vm.counselors[cabinIndex*2] + ' and ' + vm.counselors[(cabinIndex*2)+1];
      }
    }

    function scrambleCounselors() {
      vm.counselors = _.shuffle(vm.counselors);
    }

    function getKids(cabinIndex) {
      var csv = _.map(vm.kids.split('\n'), function(line){
        var arr = line.split(',');
        arr[1] = +arr[1];
        return arr;
      });

      csv = _.sortBy(csv, function(arr){
        return arr[1];
      });

      var kidsPerCabin = parseInt(csv.length / vm.cabinCount);
      if (cabinIndex == vm.cabinCount - 1)
        return csv.slice(cabinIndex*kidsPerCabin);
      else
        return csv.slice(cabinIndex*kidsPerCabin, (cabinIndex*kidsPerCabin)+kidsPerCabin);
    }
  }
})();

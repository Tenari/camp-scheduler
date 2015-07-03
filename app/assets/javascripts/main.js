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
    vm.cabinCount = 0;

    function getNumber(n){
      return new Array(n);
    }

    function getCounselors(cabinIndex) {
      return vm.counselors[cabinIndex*2] + ' and ' + vm.counselors[(cabinIndex*2)+1];
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

      var kidsPerCabin = csv.length / vm.cabinCount;
      console.log(csv, kidsPerCabin, cabinIndex);
      return csv.slice(parseInt(cabinIndex*kidsPerCabin), parseInt(cabinIndex*kidsPerCabin)+parseInt(kidsPerCabin));
    }
  }
})();

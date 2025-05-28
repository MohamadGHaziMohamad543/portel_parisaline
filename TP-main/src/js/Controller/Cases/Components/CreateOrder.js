$ANComponent.createOrder = {
  FUN: ['$scope', '$location', '$routeParams', '$rootScope',
    function ($scope, $location, $routeParams, $rootScope) {
      this.$onInit = function () {
        $scope.idPatient = this.idPatient;
        $scope.buttonNext = this.buttonNext;
        $scope.nextTab = () => {
          this.buttonNext();
        };
        $scope.backTab = () => {
          this.buttonBack();
        };
        var idIPR = "";
        $scope.ServerUrl = CONFIG.serverImageUrl;
        $scope.idCases = -1;
        var renderIPROption = (image, name) => {
          if ($scope.StopForm == true) {
            return;
          }
          var popoverTemplate = `
                <div id="IPR${name}">
                    <div class="boxSVGIPR">
                        <div class="showSVGIPR">${image}</div>
                        <a class="titleSGIPR">${name}</a>
                    </div>
                    <div class="radio mb-2">
                        <input type="radio" name="optionIPRVALUE" id="IPRoptionExtraction0" value="0" checked="">
                        <label for="IPRoptionExtraction0">
                            None
                        </label>
                    </div>
                    <div class="radio mb-2">
                        <input type="radio" name="optionIPRVALUE" id="IPRoptionExtraction1" value="1">
                        <label for="IPRoptionExtraction1">
                            Extraction/Missing
                        </label>
                    </div>
                    <div class="radio radio-primary mb-2">
                        <input type="radio" name="optionIPRVALUE" id="IPRoptionExtraction4" value="4">
                        <label for="IPRoptionExtraction4">
                            Exclude From Treatment
                        </label>
                    </div>
                    <div class="radio radio-success mb-2">
                        <input type="radio" name="optionIPRVALUE" id="IPRoptionExtraction2" value="2">
                        <label for="IPRoptionExtraction2">
                            Place attachment
                        </label>
                    </div>
                    <a id="closebtnProvver" class="btn btn-outline-info" style="cursor: pointer;width: 100%;margin-top: 5px;">Close</a>
                </div>
                `;
          $('.popover .popover-body').html(popoverTemplate);

          $('#IPR' + name + ' img').css('display', 'none');
          for (var key in $scope.IPRArray) {
            if (key == name) {
              $('#IPR' + name + ' #IPRoptionExtraction' + $scope.IPRArray[key].I).attr('checked', true);
            }
          }
          $('.popover input').on("change", (e) => {
            if (e.target.type == "radio") {
              $scope.$apply(() => {
                for (var key in $scope.IPRArray) {
                  if (key == name) {
                    $scope.IPRArray[key].I = e.target.value;
                  }
                }
              });
            }
            else if (e.target.type == "number") {
              $scope.$apply(() => {
                for (var key in $scope.IPRArray) {
                  if (key == name) {
                    $scope.IPRArray[key].T = e.target.value;
                  }
                }
              });
            }
          });
          $('.popover #closebtnProvver').click(() => {
            $(idIPR).popover('hide');
            $(idIPR).removeClass("activeIPR");
          });
        }
        var renderIPRValue = (image, name, nameL) => {
          if ($scope.StopForm == true) {
            return;
          }
          var popoverTemplate = `
                <div id="IPR${name}">
                    <div class="boxSVGIPR">
                        <div class="showSVGIPR">${$('#' + name).html()}</div>
                        <a class="titleSGIPR" style="font-size: 16px;width: 100px;">${name + '' + nameL}</a>
                        <div class="showSVGIPR">${$('#' + nameL).html()}</div>
                    </div>
                    <div>
                        Value:<input type="number" min="0.0" step="0.1" class="inputItemsCreateOrder inputChekbox">
                    </div>
                    <a id="closebtnProvver"  class="btn btn-outline-info" style="cursor: pointer;width: 100%;margin-top: 5px;">Close</a>
                </div>
                `;
          $('.popover .popover-body').html(popoverTemplate);
          $('#IPR' + name + ' img').css('display', 'none');
          for (var key in $scope.IPRArray) {
            if (key == name) {
              $('#IPR' + name + ' input[type="number"]').val($scope.IPRArray[key].T);
            }
          }
          $('.popover input').on("change", (e) => {
            if (e.target.type == "number") {
              $scope.$apply(() => {
                for (var key in $scope.IPRArray) {
                  if (key == name) {
                    $scope.IPRArray[key].T = e.target.value;
                  }
                }
              });
            }
          });
          $('.popover #closebtnProvver').click(() => {
            $(idIPR).popover('hide');
            $(idIPR).removeClass("activeIPR");
          });
        }
        $scope.renderIPR = () => {
          $('.IPR').click((e) => {
            console.log("start");
            if (!$(e.currentTarget).attr('idl')) {
              console.log("1");
              if (e.currentTarget === idIPR) {
                console.log("11");
                $(e.currentTarget).popover('toggle');
                $(e.currentTarget).toggleClass("activeIPR");
                renderIPROption(e.currentTarget.innerHTML, e.currentTarget.id);
                idIPR = null;
              }
              else {
                console.log("12");
                $('.IPR').popover('hide');
                $('.IPR').removeClass("activeIPR");
                $('.popover').remove();
                setTimeout(() => {

                  $(e.currentTarget).popover('show');
                  $(e.currentTarget).addClass("activeIPR");
                  renderIPROption(e.currentTarget.innerHTML, e.currentTarget.id);
                  idIPR = e.currentTarget;
                }, 4);
              }
            }
            else {
              console.log("2");
              if (e.currentTarget === idIPR) {
                console.log("21");
                $(e.currentTarget).popover('toggle');
                renderIPRValue(e.currentTarget.innerHTML, e.currentTarget.id, $(e.currentTarget).attr('idl'));
              }
              else {
                console.log("22");
                $('.IPR').popover('hide');
                $('.IPR').removeClass("activeIPR");
                $('.popover').remove();
                setTimeout(() => {
                  $(e.currentTarget).popover('show');
                  $(e.currentTarget).addClass("activeIPR");
                  renderIPRValue(e.currentTarget.innerHTML, e.currentTarget.id, $(e.currentTarget).attr('idl'));
                  idIPR = e.currentTarget;
                }, 4);
              }
            }

            // $scope.setPostionToolTipe(e.currentTarget.offsetLeft,e.currentTarget.offsetTop);
          });

          $('.IPR').popover({
            content: '<strong class="color-red">Disabled..</strong>',
            title: "",
            placement: "auto",
            container: 'body',
            html: true,
            boundary: "viewport",
            trigger: "manual"
          });
        }

        $scope.treatmentTypeItems = [
          { id: 1, label: "Express" },
          { id: 2, label: "Lite" },
          { id: 3, label: "Moderate" },
          { id: 4, label: "Complex" },
          { id: 5, label: "Comprehensive" },
        ];
        $scope.treatmentType = "1";
        $scope.incisorsMidlineItems = [
          { id: 0, label: "None" },
          { id: 1, label: "Improve" },
          { id: 2, label: "Maintain" },
          { id: 3, label: "Correct" }
        ];
        $scope.incisorsMidline = "0";
        $scope.incisorsOverbiteItems = [
          { id: 0, label: "None" },
          { id: 1, label: "Maintain" },
          { id: 2, label: "Increase" },
          { id: 3, label: "Decrease" },
        ];
        $scope.incisorsOverbite = "0";
        $scope.incisorsOverjetItems = [
          { id: 0, label: "None" },
          { id: 1, label: "Maintain" },
          { id: 2, label: "Increase" },
          { id: 3, label: "Decrease" },
        ];
        $scope.incisorsOverjet = "0";
        $scope.posteriorSpacingItems = [
          { id: 0, label: "None" },
          { id: 1, label: "Close ALL Spaces" },
          { id: 2, label: "Leave ALL Spaces" },
          { id: 3, label: "Leave Space Anteriorly For Prosthesis" },
        ];
        $scope.posteriorSpacing = "0";
        $scope.posteriorArchWdithItems = [
          { id: 0, label: "None" },
          { id: 1, label: "Maintain" },
          { id: 2, label: "Expand" },
          { id: 3, label: "Narrow" },
        ];
        $scope.posteriorArchWdith = "0";
        $scope.posteriorPosteriorCrossBiteItems = [
          { id: 0, label: "None" },
          { id: 1, label: "Maintain" },
          { id: 2, label: "Correct" },
          { id: 3, label: "Expand" },
          { id: 4, label: "Narrow" },
        ];

        $scope.posteriorPosteriorCrossBite = "0";
        $scope.classDesiredMRigthItems = [
          { id: 0, label: "None" },
          { id: 1, label: "Class I" },
          { id: 2, label: "Class II" },
          { id: 3, label: "Class III" },
        ];
        $scope.classDesiredMRigth = "0";
        $scope.classDesiredMLeftItems = [
          { id: 0, label: "None" },
          { id: 1, label: "Class I" },
          { id: 2, label: "Class II" },
          { id: 3, label: "Class III" },
        ];
        $scope.classDesiredMLeft = "0";
        $scope.classDesiredRRigthItems = [
          { id: 0, label: "None" },
          { id: 1, label: "Class I" },
          { id: 2, label: "Class II" },
          { id: 3, label: "Class III" },
        ];
        $scope.classDesiredRRigth = "0";
        $scope.classDesiredRLeftItems = [
          { id: 0, label: "None" },
          { id: 1, label: "Class I" },
          { id: 2, label: "Class II" },
          { id: 3, label: "Class III" },
        ];
        $scope.classDesiredRLeft = "0";
        $scope.IPRArray = {
          UR8: { T: 0, I: 0, number: 11, name: 'UR8' },
          UR7: { T: 0, I: 0, number: 12, name: 'UR7' },
          UR6: { T: 0, I: 0, number: 13, name: 'UR6' },
          UR5: { T: 0, I: 0, number: 14, name: 'UR5' },
          UR4: { T: 0, I: 0, number: 15, name: 'UR4' },
          UR3: { T: 0, I: 0, number: 16, name: 'UR3' },
          UR2: { T: 0, I: 0, number: 17, name: 'UR2' },
          UR1: { T: 0, I: 0, number: 18, name: 'UR1' },
          UL8: { T: 0, I: 0, number: 21, name: 'UL8' },
          UL7: { T: 0, I: 0, number: 22, name: 'UL7' },
          UL6: { T: 0, I: 0, number: 23, name: 'UL6' },
          UL5: { T: 0, I: 0, number: 24, name: 'UL5' },
          UL4: { T: 0, I: 0, number: 25, name: 'UL4' },
          UL3: { T: 0, I: 0, number: 26, name: 'UL3' },
          UL2: { T: 0, I: 0, number: 27, name: 'UL2' },
          UL1: { T: 0, I: 0, number: 28, name: 'UL1' },
          LR8: { T: 0, I: 0, number: 31, name: 'LR8' },
          LR7: { T: 0, I: 0, number: 32, name: 'LR7' },
          LR6: { T: 0, I: 0, number: 33, name: 'LR6' },
          LR5: { T: 0, I: 0, number: 34, name: 'LR5' },
          LR4: { T: 0, I: 0, number: 35, name: 'LR4' },
          LR3: { T: 0, I: 0, number: 36, name: 'LR3' },
          LR2: { T: 0, I: 0, number: 37, name: 'LR2' },
          LR1: { T: 0, I: 0, number: 38, name: 'LR1' },
          LL8: { T: 0, I: 0, number: 41, name: 'LL8' },
          LL7: { T: 0, I: 0, number: 42, name: 'LL7' },
          LL6: { T: 0, I: 0, number: 43, name: 'LL6' },
          LL5: { T: 0, I: 0, number: 44, name: 'LL5' },
          LL4: { T: 0, I: 0, number: 45, name: 'LL4' },
          LL3: { T: 0, I: 0, number: 46, name: 'LL3' },
          LL2: { T: 0, I: 0, number: 47, name: 'LL2' },
          LL1: { T: 0, I: 0, number: 48, name: 'LL1' },
        };

        $scope.ImpressionsItem = "1";
        $scope.iPRInstructions = "2";
        $scope.crowdingExpandMandibular = false;
        $scope.crowdingExpandMaxillar = false;
        $scope.crowdingProclineMandibular = false;
        $scope.crowdingProclineMaxillar = false;


        $scope.noAttachment = false;
        $scope.removeAttachmentonlaststage = false;
        $scope.removeAttachmentonstage = false;
        $scope.removeAttachmentonstageNumber = 0;

        $scope.tretmentGols = "";


        $scope.shippingId = "0";

        $scope.ImpressionsFile = [];
        HTTPs.POST(CONFIG.serverUrl + "/GISTL", { id: this.idPatient }).then(res => {
          res = JSON.parse(res);
          if (res.message == 2000) {
            $scope.$apply(() => {
              $scope.ImpressionsFile = res.data;
            });
          }
        });
        $scope.DataAdress = [];
        $scope.getAllShipping = () => {
          HTTPs.POST(CONFIG.serverUrl + "/GASH", {}).then(res => {
            res = JSON.parse(res);
            if (res.error == 0) {
              $scope.$apply(() => {
                $scope.DataAdress = res.data;
                if (res.data.length != 0) {
                  $scope.shippingId = res.data[0].id.toString();
                }
              });
            }
          });
        }
        $scope.getAllShipping();
        $scope.StopForm = false;
        $scope.LoaderForm = false;
        $scope.Create = () => {
          let Param = {
            patientId: $scope.idPatient,
            impressions: $scope.ImpressionsItem,
            shippingId: $scope.shippingId,
            rx: $scope.IPRArray,
            treatmentType: $scope.treatmentType,
            incisorsMidline: $scope.incisorsMidline,
            incisorsOverbite: $scope.incisorsOverbite,
            incisorsOverjet: $scope.incisorsOverjet,
            posteriorSpacing: $scope.posteriorSpacing,
            posteriorArchWdith: $scope.posteriorArchWdith,
            posteriorPosteriorCrossBite: $scope.posteriorPosteriorCrossBite,
            crowdingProclineMaxillar: $scope.crowdingProclineMaxillar,
            crowdingExpandMaxillar: $scope.crowdingExpandMaxillar,
            crowdingProclineMandibular: $scope.crowdingProclineMandibular,
            crowdingExpandMandibular: $scope.crowdingExpandMandibular,
            classDesiredMRigth: $scope.classDesiredMRigth,
            classDesiredMLeft: $scope.classDesiredMLeft,
            classDesiredRRigth: $scope.classDesiredRRigth,
            classDesiredRLeft: $scope.classDesiredRLeft,
            noAttachment: $scope.noAttachment,
            removeAttachmentonlaststage: $scope.removeAttachmentonlaststage,
            removeAttachmentonstage: $scope.removeAttachmentonstage,
            removeAttachmentonstageNumber: $scope.removeAttachmentonstageNumber,
            iPRInstructions: $scope.iPRInstructions,
            tretmentGols: $scope.tretmentGols
          };
          if ($scope.shippingId == 0 && $scope.ImpressionsItem == "1") {
            $('#shippingAddrss').addClass("errorInput");
            $('#shippingAddrss').removeClass("sucssInput");
            return;
          }
          $scope.StopForm = true;
          $scope.LoaderForm = true;
          HTTPs.POST(CONFIG.serverUrl + "/CC", Param).then(res => {
            res = JSON.parse(res);
            if (res.error == 0) {
              if (res.message == 2000) {
                $scope.$apply(() => {
                  $scope.LoaderForm = false;
                  $scope.idCases = res.data;
                  this.buttonNext();
                });
              }
            }
            console.log(res);
          });
        }

        $scope.hidePop = () => {
          $('.popover #closebtnProvver').click();
        }
        $scope.typeOrder = null;
        $scope.getAll = () => {
          HTTPs.POST(CONFIG.serverUrl + "/GAC", { id: $scope.idPatient }).then(res => {
            res = JSON.parse(res);
            if (res.error == 0) {
              $scope.$apply(() => {
                if (res.data.length != 0) {
                  $scope.ImpressionsItem = res.data[0].impressions.toString();
                  $scope.shippingId = res.data[0].shippingId.toString();
                  $scope.IPRArray = JSON.parse(res.data[0].rx);
                  $scope.treatmentType = res.data[0].treatmentType.toString();
                  $scope.incisorsMidline = res.data[0].incisorsMidline.toString();
                  $scope.incisorsOverbite = res.data[0].incisorsOverbite.toString();
                  $scope.incisorsOverjet = res.data[0].incisorsOverjet.toString();
                  $scope.posteriorSpacing = res.data[0].posteriorSpacing.toString();
                  $scope.posteriorArchWdith = res.data[0].posteriorArchWdith.toString();
                  $scope.posteriorPosteriorCrossBite = res.data[0].posteriorPosteriorCrossBite.toString();
                  $scope.crowdingProclineMaxillar = res.data[0].crowdingProclineMaxillar == 1 ? true : false;
                  $scope.crowdingExpandMaxillar = res.data[0].crowdingExpandMaxillar == 1 ? true : false;
                  $scope.crowdingProclineMandibular = res.data[0].crowdingProclineMandibular == 1 ? true : false;
                  $scope.crowdingExpandMandibular = res.data[0].crowdingExpandMandibular == 1 ? true : false;
                  $scope.classDesiredMRigth = res.data[0].classDesiredMRigth.toString();
                  $scope.classDesiredMLeft = res.data[0].classDesiredMLeft.toString();
                  $scope.classDesiredRRigth = res.data[0].classDesiredRRigth.toString();
                  $scope.classDesiredRLeft = res.data[0].classDesiredRLeft.toString();
                  $scope.noAttachment = res.data[0].noAttachment.toString();
                  $scope.removeAttachmentonlaststage = res.data[0].removeAttachmentonlaststage == 1 ? true : false;
                  $scope.removeAttachmentonstage = res.data[0].removeAttachmentonstage == 1 ? true : false;
                  $scope.removeAttachmentonstageNumber = res.data[0].removeAttachmentonstageNumber;
                  $scope.iPRInstructions = res.data[0].iPRInstructions.toString();
                  $scope.tretmentGols = res.data[0].tretmentGols;
                  $scope.idCases = res.data[0].id;
                  $scope.LoaderForm = false;
                  $scope.StopForm = true;
                  if (res.data[0].typeOrder == null) {
                    $scope.typeOrder = 0;
                  }
                  else {
                    $scope.typeOrder = 1;
                    setTimeout(() => {
                      $scope.$apply(() => {
                        newOrder();
                        if (res.data[0].typeOrder == 2) {
                          loadValue(res.data[0]);
                        }
                      });
                    }, 500);
                  }
                }
                else {
                  $scope.typeOrder = 1;
                  setTimeout(() => {
                    $scope.$apply(() => {
                      newOrder();
                    });
                  }, 500);
                }


              });
            }
          });
        }
        $scope.getAll();
        $rootScope.$on("updateShippings", (event, valueFile) => {
          $scope.getAllShipping();
        });
        $scope.StopForm = true;
        $scope.Edit = () => {
          $scope.StopForm = false;
        }
        $scope.Save = () => {
          let Param = {
            id: $scope.idCases,
            patientId: $scope.idPatient,
            impressions: $scope.ImpressionsItem,
            shippingId: $scope.shippingId,
            rx: $scope.IPRArray,
            treatmentType: $scope.treatmentType,
            incisorsMidline: $scope.incisorsMidline,
            incisorsOverbite: $scope.incisorsOverbite,
            incisorsOverjet: $scope.incisorsOverjet,
            posteriorSpacing: $scope.posteriorSpacing,
            posteriorArchWdith: $scope.posteriorArchWdith,
            posteriorPosteriorCrossBite: $scope.posteriorPosteriorCrossBite,
            crowdingProclineMaxillar: $scope.crowdingProclineMaxillar,
            crowdingExpandMaxillar: $scope.crowdingExpandMaxillar,
            crowdingProclineMandibular: $scope.crowdingProclineMandibular,
            crowdingExpandMandibular: $scope.crowdingExpandMandibular,
            classDesiredMRigth: $scope.classDesiredMRigth,
            classDesiredMLeft: $scope.classDesiredMLeft,
            classDesiredRRigth: $scope.classDesiredRRigth,
            classDesiredRLeft: $scope.classDesiredRLeft,
            noAttachment: $scope.noAttachment,
            removeAttachmentonlaststage: $scope.removeAttachmentonlaststage,
            removeAttachmentonstage: $scope.removeAttachmentonstage,
            removeAttachmentonstageNumber: $scope.removeAttachmentonstageNumber,
            iPRInstructions: $scope.iPRInstructions,
            tretmentGols: $scope.tretmentGols
          };
          $scope.StopForm = true;
          $scope.LoaderForm = true;
          HTTPs.POST(CONFIG.serverUrl + "/CU", Param).then(res => {
            res = JSON.parse(res);
            if (res.error == 0) {
              if (res.message == 2001) {
                $scope.$apply(() => {
                  $scope.LoaderForm = false;
                  $scope.idCases = res.data;
                });
              }
            }
          });
        }
        var newOrder = () => {
          $('.x-btn').hide();
          $('.y-btn').click(function (event) {
            $('.x-btn').show();
            event.preventDefault();
            $('.image-scroll').animate({
              scrollLeft: "+=300px"
            }, "slow");
          });

          $('.x-btn').click(function (event) {
            event.preventDefault();
            $('.image-scroll').animate({
              scrollLeft: "-=300px"
            }, "slow");
          });

          function RenderTeeth(id) {
            let g = document.getElementById(id + 'SVG').querySelectorAll('g');
            for (let i = 0; i < g.length; i++) {
              if (g[i].id != undefined && g[i].id != "") {
                g[i].addEventListener('click', (e) => {
                  let input = document.getElementById(id).querySelector('#' + id + e.currentTarget.id);
                  if (e.currentTarget.querySelector('path').style.fill == "rgb(245, 79, 158)") {
                    input.checked = false;
                    e.currentTarget.querySelector('path').style.fill = "#fff";
                  }
                  else {
                    input.checked = true;
                    e.currentTarget.querySelector('path').style.fill = "rgb(245, 79, 158)";
                  }
                });
              }
            }
            let input = document.getElementById(id).querySelectorAll('input');
            for (let p = 0; p < input.length; p++) {
              input[p].addEventListener('change', (e) => {
                let g = document.getElementById(id + 'SVG').querySelector('#' + e.target.id.split(id)[1]);
                if (e.target.checked) {
                  g.querySelector('path').style.fill = "#f54f9e";
                }
                else {
                  g.querySelector('path').style.fill = "#fff";
                }
              });
            }

          }
          function Chanumber(id, numbers) {
            var elemetn = document.querySelectorAll('#' + id + ' input');
            elemetn.forEach(res => {
              res.parentNode.querySelector('label').innerText = numbers[res.id[res.id.length - 3] + res.id[res.id.length - 2] + res.id[res.id.length - 1]];
            });
            var elemetn = document.querySelectorAll('#' + id + 'SVG text');
            elemetn.forEach(res => {
              res.innerHTML = numbers[res.id];
            });
          }

          function changeAll(e) {
            let numbers = [];
            if (e == "Palmar") {

              document.getElementById('Universal').classList.add('activeBtnSystem');
              document.getElementById('Palmar').classList.remove('activeBtnSystem');
              numbers = {
                LL1: "24",
                LL2: "23",
                LL3: "22",
                LL4: "21",
                LL5: "20",
                LL6: "19",
                LL7: "18",
                LL8: "17",
                LR1: "25",
                LR2: "26",
                LR3: "27",
                LR4: "28",
                LR5: "29",
                LR6: "30",
                LR7: "31",
                LR8: "32",
                UL1: "9",
                UL2: "10",
                UL3: "11",
                UL4: "12",
                UL5: "13",
                UL6: "14",
                UL7: "15",
                UL8: "16",
                UR1: "8",
                UR2: "7",
                UR3: "6",
                UR4: "5",
                UR5: "4",
                UR6: "3",
                UR7: "2",
                UR8: "1",
              };
            }
            else {
              document.getElementById('Universal').classList.remove('activeBtnSystem');
              document.getElementById('Palmar').classList.add('activeBtnSystem');
              numbers = {
                LL1: "1",
                LL2: "2",
                LL3: "3",
                LL4: "4",
                LL5: "5",
                LL6: "6",
                LL7: "7",
                LL8: "8",
                LR1: "1",
                LR2: "2",
                LR3: "3",
                LR4: "4",
                LR5: "5",
                LR6: "6",
                LR7: "7",
                LR8: "8",
                UL1: "1",
                UL2: "2",
                UL3: "3",
                UL4: "4",
                UL5: "5",
                UL6: "6",
                UL7: "7",
                UL8: "8",
                UR1: "1",
                UR2: "2",
                UR3: "3",
                UR4: "4",
                UR5: "5",
                UR6: "6",
                UR7: "7",
                UR8: "8",
              };
            }
            Chanumber('TeethNotToIncludeInMovement', numbers);
            Chanumber('TeethNotToPlaceAttachmentsOn', numbers);
            Chanumber('Crowding', numbers);
            Chanumber('Spaces', numbers);
            Chanumber('PlaceElasticCutsOn', numbers);
            Chanumber('PlaceButtonCutsOn', numbers);

          }

          document.getElementById('Universal').addEventListener('click', (e) => {
            changeAll('Palmar');
          });

          document.getElementById('Palmar').addEventListener('click', (e) => {
            changeAll('Universal');
          });

          document.getElementsByName('TreatUpper').forEach(res => {
            res.addEventListener('change', (e) => {
              console.log(document.querySelector('#CrowdingItem input[name="TreatLower"]:checked'));
              if (e.target.id == "Treat") {
                document.getElementById('Crowding').querySelector('#Crowding #teethbox1').style.display = "none";
                document.getElementById('Crowding').querySelector('#Crowding #teethbox2').style.display = "none";
                if (document.querySelector('#CrowdingItem input[name="TreatLower"]:checked')?.id != "ExtractionLower") {
                  document.getElementById('CrowdingR').style.display = "none";
                  document.getElementById('CrowdingL').style.display = "none";
                }
                document.getElementById('TreatUpper').style.display = "block";
              }
              else if (e.target.id == "TreatWithExtraction") {

                document.getElementById('TreatUpper').style.display = "none";
                if (e.target.checked) {
                  document.getElementById('Crowding').querySelector('#Crowding #teethbox1').style.display = "inline-flex";
                  document.getElementById('Crowding').querySelector('#Crowding #teethbox2').style.display = "inline-flex";
                  document.getElementById('CrowdingR').style.display = "inline-flex";
                  document.getElementById('CrowdingL').style.display = "inline-flex";
                }

              }
              else {
                document.getElementById('Crowding').querySelector('#Crowding #teethbox1').style.display = "none";
                document.getElementById('Crowding').querySelector('#Crowding #teethbox2').style.display = "none";
                if (document.querySelector('#CrowdingItem input[name="TreatLower"]:checked')?.id != "ExtractionLower") {
                  document.getElementById('CrowdingR').style.display = "none";
                  document.getElementById('CrowdingL').style.display = "none";
                }
                document.getElementById('TreatUpper').style.display = "none";
              }
            });
          });
          document.getElementsByName('TreatLower').forEach(res => {
            res.addEventListener('change', (e) => {
              if (e.target.id == "Treat") {
                document.getElementById('Crowding').querySelector('#Crowding #teethbox3').style.display = "none";
                document.getElementById('Crowding').querySelector('#Crowding #teethbox4').style.display = "none";
                if (document.querySelector('#CrowdingItem input[name="TreatUpper"]:checked').id != "Extraction") {
                  document.getElementById('CrowdingR').style.display = "none";
                  document.getElementById('CrowdingL').style.display = "none";
                }
                document.getElementById('TreatLower').style.display = "block";
              }
              else if (e.target.id == "TreatWithExtraction") {
                if (e.target.checked) {
                  document.getElementById('Crowding').querySelector('#Crowding #teethbox3').style.display = "inline-flex";
                  document.getElementById('Crowding').querySelector('#Crowding #teethbox4').style.display = "inline-flex";
                  document.getElementById('CrowdingR').style.display = "inline-flex";
                  document.getElementById('CrowdingL').style.display = "inline-flex";
                }
                document.getElementById('TreatLower').style.display = "none";
              }
              else {
                document.getElementById('Crowding').querySelector('#Crowding #teethbox3').style.display = "none";
                document.getElementById('Crowding').querySelector('#Crowding #teethbox4').style.display = "none";
                if (document.querySelector('#CrowdingItem input[name="TreatUpper"]:checked').id != "Extraction") {
                  document.getElementById('CrowdingR').style.display = "none";
                  document.getElementById('CrowdingL').style.display = "none";
                }
                document.getElementById('TreatLower').style.display = "none";
              }
            });
          });

          document.getElementsByName('Spaces').forEach(res => {
            res.addEventListener('change', (e) => {
              if (e.target.id == "SpacesLeaveSpacesAroundTheseTeethForFutureRestorations") {
                document.getElementById('Spaces').style.display = "block";
                document.getElementById('SpacesR').style.display = "inline-flex";
                document.getElementById('SpacesL').style.display = "inline-flex";
              }
              else {
                document.getElementById('Spaces').style.display = "none";
                document.getElementById('SpacesR').style.display = "none";
                document.getElementById('SpacesL').style.display = "none";
              }
            });
          });
          var OverBite = document.getElementsByName('OverBite');
          OverBite.forEach(res => {
            res.addEventListener('change', (e) => {
              if (e.target.id == "CorrectDeepBite") {
                document.querySelector('.DeepBite').style.display = "block";
                document.querySelector('.OpenBite').style.display = "none";
              }
              else if (e.target.id == "CorrectOpenBite") {
                document.querySelector('.DeepBite').style.display = "none";
                document.querySelector('.OpenBite').style.display = "block";
              }
              else {
                document.querySelector('.DeepBite').style.display = "none";
                document.querySelector('.OpenBite').style.display = "none";
              }
            });
          });
          var OverJet = document.getElementsByName('OverJet');
          OverJet.forEach(res => {
            res.addEventListener('change', (e) => {
              if (e.target.id == "CorrectOverjet") {
                document.getElementById('boxCorrectOverjet').style.display = "block";
              }
              else {
                document.getElementById('boxCorrectOverjet').style.display = "none";
              }
            });
          });

          var valueCreateOeder = {};
          $scope.getAllValues = () => {
            var ErrorNumber = 0;
            valueCreateOeder['ArchesToTreatItem'] = document.getElementById('ArchesToTreatItem').querySelector('input[name="ArchesToTreat"]:checked')?.getAttribute('idValue');
            if (valueCreateOeder['ArchesToTreatItem'] === undefined) {
              document.getElementById('ArchesToTreatItem').style.border = "4px solid #e65959";
              document.getElementById('ArchesToTreatItem').style.borderRadius = "6px";
              try {
                var ele = document.getElementById('ArchesToTreatItem');
                document.getElementById('ErrorArchesToTreatItem').innerHTML = "This section is mandatary, please select an option";
                window.scrollTo(ele.offsetLeft, ele.offsetTop);
              }
              catch {

              }
              ErrorNumber++;
            }
            else {
              document.getElementById('ArchesToTreatItem').style.border = "none";
            }

            //TeethNOTToIncludeInMovementItem
            TeethNOTToIncludeInMovementVal = [];
            TeethNOTToIncludeInMovementElements = document.getElementById('TeethNOTToIncludeInMovementItem').querySelectorAll('input');

            for (let i = 0; i < TeethNOTToIncludeInMovementElements.length; i++) {
              TeethNOTToIncludeInMovementVal.push({ name: TeethNOTToIncludeInMovementElements[i].id.split('TeethNotToIncludeInMovement')[1], value: TeethNOTToIncludeInMovementElements[i].checked })
            }
            valueCreateOeder['TeethNOTToIncludeInMovementItem'] = TeethNOTToIncludeInMovementVal;

            //TeethNOTToPlaceSttachmentsOnItem
            TeethNOTToPlaceSttachmentsOnVal = [];
            TeethNOTToPlaceSttachmentsOnElements = document.getElementById('TeethNOTToPlaceSttachmentsOnItem').querySelectorAll('input');
            for (let i = 0; i < TeethNOTToPlaceSttachmentsOnElements.length; i++) {
              TeethNOTToPlaceSttachmentsOnVal.push({ name: TeethNOTToPlaceSttachmentsOnElements[i].id.split('TeethNotToPlaceAttachmentsOn')[1], value: TeethNOTToPlaceSttachmentsOnElements[i].checked })
            }
            valueCreateOeder['TeethNOTToPlaceSttachmentsOnItem'] = TeethNOTToPlaceSttachmentsOnVal;
            //Crowding
            valueCreateOeder['CrowdingUpperArch'] = document.querySelector('#CrowdingItem  input[name="TreatUpper"]:checked')?.id;
            valueCreateOeder['CrowdingLowerArch'] = document.querySelector('#CrowdingItem  input[name="TreatLower"]:checked')?.id;
            var TreatUpper = document.querySelectorAll('#TreatUpper  input:checked');
            if (TreatUpper.length == 0 && valueCreateOeder['CrowdingUpperArch'] === "Treat") {
              document.querySelector('#CrowdingItem  #lableTreatUpper').style.borderBottom = "1px solid #ff0404";
              ErrorNumber++;
            } else {
              document.querySelector('#CrowdingItem  #lableTreatUpper').style.borderBottom = 'none';
              let arrayTreatUpper = [];
              TreatUpper.forEach(res => {
                arrayTreatUpper.push(res.id);
              });
              valueCreateOeder['CrowdingUpperTreat'] = JSON.stringify(arrayTreatUpper);
            }
            var TreatLower = document.querySelectorAll('#TreatLower  input:checked');
            if (TreatLower.length == 0 && valueCreateOeder['CrowdingLowerArch'] === "Treat") {
              document.querySelector('#CrowdingItem  #lableTreatLower').style.borderBottom = "1px solid #ff0404";
              ErrorNumber++;
            } else {
              document.querySelector('#CrowdingItem  #lableTreatLower').style.borderBottom = 'none';
              let arrayTreatLower = [];
              TreatLower.forEach(res => {
                arrayTreatLower.push(res.id);
              });
              valueCreateOeder['CrowdingLowerTreat'] = JSON.stringify(arrayTreatLower);
            }

            if (valueCreateOeder['CrowdingUpperArch'] === undefined || valueCreateOeder['CrowdingLowerArch'] === undefined) {
              document.getElementById('CrowdingItem').style.border = "4px solid #e65959";
              document.getElementById('CrowdingItem').style.borderRadius = "6px";
              try {
                var ele = document.getElementById('CrowdingItem');
                document.getElementById('ErrorCrowdingItem').innerHTML = "Please select an option for upper arch, and lower arch";
                window.scrollTo(ele.offsetLeft, ele.offsetTop);
              }
              catch {

              }
              ErrorNumber++;
            }
            else {
              document.getElementById('CrowdingItem').style.border = "none";
            }

            //IPR CROWDING
            CrowdingIPRVal = [];
            CrowdingIPRElements = document.getElementById('Crowding').querySelectorAll('input');
            for (let i = 0; i < CrowdingIPRElements.length; i++) {
              CrowdingIPRVal.push({ name: CrowdingIPRElements[i].id.split('Crowding')[1], value: CrowdingIPRElements[i].checked })
            }
            valueCreateOeder['CrowdingIPR'] = CrowdingIPRVal;

            //SpacesItem
            valueCreateOeder['SpacesItem'] = document.querySelector('#SpacesItem input[name="Spaces"]:checked')?.id;
            if (valueCreateOeder['SpacesItem'] === undefined) {
              document.getElementById('SpacesItem').style.border = "4px solid #e65959";
              document.getElementById('SpacesItem').style.borderRadius = "6px";
              try {
                var ele = document.getElementById('SpacesItem');
                document.getElementById('ErrorSpacesItem').innerHTML = "This section is mandatary, please select an option";
                window.scrollTo(ele.offsetLeft, ele.offsetTop);
              }
              catch {

              }
              ErrorNumber++;
            }
            else {
              document.getElementById('SpacesItem').style.border = "none";
            }

            //IPR Spaces
            SpacesIPRVal = [];
            SpacesIPRElements = document.getElementById('SpacesItem').querySelectorAll('#Spaces input');
            for (let i = 0; i < SpacesIPRElements.length; i++) {
              SpacesIPRVal.push({ name: SpacesIPRElements[i].id.split('Spaces')[1], value: SpacesIPRElements[i].checked })
            }
            valueCreateOeder['SpacesIPR'] = SpacesIPRVal;

            valueCreateOeder['PosteriorCrossBiteItem'] = document.querySelector('#PosteriorCrossBiteItem input:checked')?.id;
            if (valueCreateOeder['PosteriorCrossBiteItem'] === undefined) {
              document.getElementById('PosteriorCrossBiteItem').style.border = "4px solid #e65959";
              document.getElementById('PosteriorCrossBiteItem').style.borderRadius = "6px";
              try {
                var ele = document.getElementById('PosteriorCrossBiteItem');
                document.getElementById('ErrorPosteriorCrossBiteItem').innerHTML = "This section is mandatary, please select an option";
                window.scrollTo(ele.offsetLeft, ele.offsetTop);
              }
              catch {

              }
              ErrorNumber++;
            }
            else {
              document.getElementById('PosteriorCrossBiteItem').style.border = "none";
            }

            //MidlinesItem
            valueCreateOeder['MidlinesItemUpper'] = document.querySelector('#MidlinesItem input[name="MidlinesUpper"]:checked')?.id;
            valueCreateOeder['MidlinesItemLower'] = document.querySelector('#MidlinesItem input[name="MidlinesLower"]:checked')?.id;

            if (valueCreateOeder['MidlinesItemUpper'] === undefined || valueCreateOeder['MidlinesItemLower'] === undefined) {
              document.getElementById('MidlinesItem').style.border = "4px solid #e65959";
              document.getElementById('MidlinesItem').style.borderRadius = "6px";
              try {
                var ele = document.getElementById('MidlinesItem');
                document.getElementById('ErrorMidlinesItem').innerHTML = "Please select an option for upper midlines, and lower midlines";
                window.scrollTo(ele.offsetLeft, ele.offsetTop);
              }
              catch {

              }
              ErrorNumber++;
            }
            else {
              document.getElementById('MidlinesItem').style.border = "none";
            }
            //OverBiteItem
            valueCreateOeder['OverBiteItem'] = document.querySelector('#OverBiteItem input[name="OverBite"]:checked')?.id;
            if (valueCreateOeder['OverBiteItem'] === undefined) {
              document.getElementById('OverBiteItem').style.border = "4px solid #e65959";
              document.getElementById('OverBiteItem').style.borderRadius = "6px";
              try {
                var ele = document.getElementById('OverBiteItem');
                document.getElementById('ErrorOverBiteItem').innerHTML = "This section is mandatary, please select an option";
                window.scrollTo(ele.offsetLeft, ele.offsetTop);
              }
              catch {

              }
              ErrorNumber++;
            }
            else {
              document.getElementById('OverBiteItem').style.border = "none";
            }
            valueCreateOeder['OverBiteDeepBite'] = [
              {
                'IntrudeAnteriorTeeth': {
                  Upper: document.querySelector('#OverBiteItem #DeepBite #IntrudeAnteriorTeeth #Upper').checked,
                  Lower: document.querySelector('#OverBiteItem #DeepBite #IntrudeAnteriorTeeth #Lower').checked
                }
              },
              {
                'IntrudeAnteriorTeethAndExtrudePremolars': {
                  Upper: document.querySelector('#OverBiteItem #DeepBite #IntrudeAnteriorTeethAndExtrudePremolars #Upper').checked,
                  Lower: document.querySelector('#OverBiteItem #DeepBite #IntrudeAnteriorTeethAndExtrudePremolars #Lower').checked
                }
              }
            ];

            valueCreateOeder['OverBiteOpenBite'] = [
              {
                'ExtrudeAnteriorTeeth': {
                  Upper: document.querySelector('#OverBiteItem #OpenBite #ExtrudeAnteriorTeeth #Upper').checked,
                  Lower: document.querySelector('#OverBiteItem #OpenBite #ExtrudeAnteriorTeeth #Lower').checked
                }
              },
              {
                'ExtrudeAnteriorTeethAndIntrudePremolars': {
                  Upper: document.querySelector('#OverBiteItem #OpenBite #ExtrudeAnteriorTeethAndIntrudePremolars #Upper').checked,
                  Lower: document.querySelector('#OverBiteItem #OpenBite #ExtrudeAnteriorTeethAndIntrudePremolars #Lower').checked
                }
              }
            ];
            if (valueCreateOeder['OverBiteItem'] === "CorrectOpenBite" && valueCreateOeder['OverBiteOpenBite'][0].ExtrudeAnteriorTeeth.Lower === false && valueCreateOeder['OverBiteOpenBite'][0].ExtrudeAnteriorTeeth.Upper === false && valueCreateOeder['OverBiteOpenBite'][1].ExtrudeAnteriorTeethAndIntrudePremolars.Upper === false && valueCreateOeder['OverBiteOpenBite'][1].ExtrudeAnteriorTeethAndIntrudePremolars.Lower === false) {
              document.getElementById('lableCorrectOpenBite').style.borderBottom = "1px solid #ff0404";
              ErrorNumber++;
            }
            else {
              document.getElementById('lableCorrectOpenBite').style.borderBottom = "none";
            }
            if (valueCreateOeder['OverBiteItem'] === "CorrectDeepBite" && valueCreateOeder['OverBiteDeepBite'][0].IntrudeAnteriorTeeth.Lower === false && valueCreateOeder['OverBiteDeepBite'][0].IntrudeAnteriorTeeth.Upper === false && valueCreateOeder['OverBiteDeepBite'][1].IntrudeAnteriorTeethAndExtrudePremolars.Upper === false && valueCreateOeder['OverBiteDeepBite'][1].IntrudeAnteriorTeethAndExtrudePremolars.Lower === false) {
              document.getElementById('lableCorrectDeepBite').style.borderBottom = "1px solid #ff0404";
              ErrorNumber++;
            }
            else {
              document.getElementById('lableCorrectDeepBite').style.borderBottom = "none";
            }

            //OverJetItem
            valueCreateOeder['OverJetItem'] = document.querySelector('#OverJetItem input[name="OverJet"]:checked')?.id;
            valueCreateOeder['CorrectOverjet'] = document.querySelector('#boxCorrectOverjet input[name="CorrectOverjet"]:checked')?.id;
            if (valueCreateOeder['OverJetItem'] === "CorrectOverjet" && valueCreateOeder['CorrectOverjet'] === undefined) {
              document.getElementById('lableCorrectOverjet').style.borderBottom = "1px solid #ff0404";
              ErrorNumber++;
            } else {
              document.getElementById('lableCorrectOverjet').style.borderBottom = "none";
            }
            if (valueCreateOeder['OverJetItem'] === undefined) {
              document.getElementById('OverJetItem').style.border = "4px solid #e65959";
              document.getElementById('OverJetItem').style.borderRadius = "6px";
              try {
                var ele = document.getElementById('OverJetItem');
                document.getElementById('ErrorOverJetItem').innerHTML = "This section is mandatary, please select an option";
                window.scrollTo(ele.offsetLeft, ele.offsetTop);
              }
              catch {

              }
              ErrorNumber++;
            }
            else {
              document.getElementById('OverJetItem').style.border = "none";
            }


            //Elastic Cuts / Button Cuts

            //IPR PlaceElasticCutsOn
            ElasticCutsButtonCutsIPRVal = [];
            ElasticCutsButtonCutsIPRElements = document.getElementById('ElasticCutsButtonCutsItem').querySelectorAll('#PlaceElasticCutsOn input');
            for (let i = 0; i < SpacesIPRElements.length; i++) {
              ElasticCutsButtonCutsIPRVal.push({ name: ElasticCutsButtonCutsIPRElements[i].id.split('PlaceElasticCutsOn')[1], value: ElasticCutsButtonCutsIPRElements[i].checked })
            }
            valueCreateOeder['PlaceElasticCutsOn'] = ElasticCutsButtonCutsIPRVal;

            //IPR PlaceButtonCutsOn
            PlaceButtonCutsOnIPRVal = [];
            PlaceButtonCutsOnIPRElements = document.getElementById('ElasticCutsButtonCutsItem').querySelectorAll('#PlaceButtonCutsOn input');
            for (let i = 0; i < SpacesIPRElements.length; i++) {
              PlaceButtonCutsOnIPRVal.push({ name: PlaceButtonCutsOnIPRElements[i].id.split('PlaceElasticCutsOn')[1], value: PlaceButtonCutsOnIPRElements[i].checked })
            }
            valueCreateOeder['PlaceButtonCutsOn'] = ElasticCutsButtonCutsIPRVal;

            //TreatmentGoalsAdditionalInstructionsItem
            valueCreateOeder['TreatmentGoalsAdditionalInstructionsItem'] = document.querySelector('#TreatmentGoalsAdditionalInstructionsItem textarea').value;
            // if(valueCreateOeder['TreatmentGoalsAdditionalInstructionsItem']==="")
            // {
            //     document.getElementById('TreatmentGoalsAdditionalInstructionsItem').style.border="4px solid #e65959";
            //     document.getElementById('TreatmentGoalsAdditionalInstructionsItem').style.borderRadius="6px";
            //     try{
            //         var ele = document.getElementById('TreatmentGoalsAdditionalInstructionsItem');   
            //         window.scrollTo(ele.offsetLeft,ele.offsetTop);
            //     }
            //     catch{

            //     }
            //     ErrorNumber++;
            // }
            // else{
            //     document.getElementById('TreatmentGoalsAdditionalInstructionsItem').style.border="none";
            // }
            if (ErrorNumber == 0) {
              return valueCreateOeder;
            }
            else {
              return false;
            }

          }


        }


        var loadValue = (data) => {

          document.querySelector('#ArchesToTreatItem #ArchesToTreat' + data.ArchesToTreatItem).click();
          let TeethNOTToIncludeInMovementItem = JSON.parse(data.TeethNOTToIncludeInMovementItem);
          if (typeof TeethNOTToIncludeInMovementItem === "string") {
            TeethNOTToIncludeInMovementItem = JSON.parse(TeethNOTToIncludeInMovementItem);
          }
          for (var i = 0; i < TeethNOTToIncludeInMovementItem.length; i++) {
            document.querySelector('#TeethNOTToIncludeInMovementItem #TeethNotToIncludeInMovement' + TeethNOTToIncludeInMovementItem[i].name).checked = TeethNOTToIncludeInMovementItem[i].value;
          }

          let TeethNOTToPlaceSttachmentsOnItem = JSON.parse(data.TeethNOTToPlaceSttachmentsOnItem);
          if (typeof TeethNOTToPlaceSttachmentsOnItem === "string") {
            TeethNOTToPlaceSttachmentsOnItem = JSON.parse(TeethNOTToPlaceSttachmentsOnItem);
          }
          for (var i = 0; i < TeethNOTToPlaceSttachmentsOnItem.length; i++) {
            document.querySelector('#TeethNOTToPlaceSttachmentsOnItem #TeethNotToPlaceAttachmentsOn' + TeethNOTToPlaceSttachmentsOnItem[i].name).checked = TeethNOTToPlaceSttachmentsOnItem[i].value;
          }

          document.querySelector('#CrowdingItem #UpperArch #' + data.CrowdingUpperArch)?.click();
          document.querySelector('#CrowdingItem #LowerArch #' + data.CrowdingLowerArch)?.click();
          if (data.CrowdingUpperTreat !== null && data.CrowdingUpperTreat !== '') {
            let CrowdingUpperTreat = JSON.parse(data.CrowdingUpperTreat);
            if (typeof CrowdingUpperTreat == "string") {
              CrowdingUpperTreat = JSON.parse(CrowdingUpperTreat);
            }
            CrowdingUpperTreat.forEach(res => {
              document.querySelector('#CrowdingItem #UpperArch #TreatUpper #' + res)?.click();
            });
          }

          if (data.CrowdingLowerTreat !== null && data.CrowdingLowerTreat !== '') {
            let CrowdingLowerTreat = JSON.parse(data.CrowdingLowerTreat);
            if (typeof CrowdingLowerTreat == "string") {
              CrowdingLowerTreat = JSON.parse(CrowdingLowerTreat);
            }
            CrowdingLowerTreat.forEach(res => {
              document.querySelector('#CrowdingItem #LowerArch #TreatLower #' + res)?.click();
            });
          }
          // document.querySelector('#CrowdingItem #UpperArch #TreatUpper #'+data.CrowdingUpperTreat)?.click();
          // document.querySelector('#CrowdingItem #LowerArch #TreatLower #'+data.CrowdingLowerTreat)?.click();

          let CrowdingIPR = JSON.parse(data.CrowdingIPR);
          if (typeof CrowdingIPR == "string") {
            CrowdingIPR = JSON.parse(CrowdingIPR);
          }

          for (var i = 0; i < CrowdingIPR.length; i++) {
            document.querySelector('#CrowdingItem #Crowding' + CrowdingIPR[i].name).checked = CrowdingIPR[i].value;
          }

          document.querySelector('#SpacesItem #' + data.SpacesItem).click();

          let SpacesIPR = JSON.parse(data.SpacesIPR);
          if (typeof SpacesIPR == "string") {
            SpacesIPR = JSON.parse(SpacesIPR);
          }
          for (var i = 0; i < SpacesIPR.length; i++) {
            document.querySelector('#SpacesItem #Spaces' + SpacesIPR[i].name).checked = SpacesIPR[i].value;
          }


          document.querySelector('#PosteriorCrossBiteItem #' + data.PosteriorCrossBiteItem)?.click();
          document.querySelector('#MidlinesItem #MidlinesUpper #' + data.MidlinesItemUpper)?.click();
          document.querySelector('#MidlinesItem #MidlinesLower #' + data.MidlinesItemLower)?.click();

          //OverBiteItem
          document.querySelector('#OverBiteItem #' + data.OverBiteItem).click();
          data.OverBiteDeepBite = JSON.parse(data.OverBiteDeepBite);
          if (typeof data.OverBiteDeepBite === "string") {
            data.OverBiteDeepBite = JSON.parse(data.OverBiteDeepBite);
          }

          document.querySelector('#OverBiteItem #DeepBite #IntrudeAnteriorTeeth #Lower').checked = data.OverBiteDeepBite[0].IntrudeAnteriorTeeth.Lower;
          document.querySelector('#OverBiteItem #DeepBite #IntrudeAnteriorTeeth #Upper').checked = data.OverBiteDeepBite[0].IntrudeAnteriorTeeth.Upper;
          document.querySelector('#OverBiteItem #DeepBite #IntrudeAnteriorTeethAndExtrudePremolars #Lower').checked = data.OverBiteDeepBite[1].IntrudeAnteriorTeethAndExtrudePremolars.Lower;
          document.querySelector('#OverBiteItem #DeepBite #IntrudeAnteriorTeethAndExtrudePremolars #Upper').checked = data.OverBiteDeepBite[1].IntrudeAnteriorTeethAndExtrudePremolars.Upper;


          data.OverBiteOpenBite = JSON.parse(data.OverBiteOpenBite);
          if (data.OverBiteOpenBite != null) {
            document.querySelector('#OverBiteItem #OpenBite #ExtrudeAnteriorTeeth #Lower').checked = data.OverBiteOpenBite[0].ExtrudeAnteriorTeeth.Lower;
            document.querySelector('#OverBiteItem #OpenBite #ExtrudeAnteriorTeeth #Upper').checked = data.OverBiteOpenBite[0].ExtrudeAnteriorTeeth.Upper;
            document.querySelector('#OverBiteItem #OpenBite #ExtrudeAnteriorTeethAndIntrudePremolars #Lower').checked = data.OverBiteOpenBite[1].ExtrudeAnteriorTeethAndIntrudePremolars.Lower;
            document.querySelector('#OverBiteItem #OpenBite #ExtrudeAnteriorTeethAndIntrudePremolars #Upper').checked = data.OverBiteOpenBite[1].ExtrudeAnteriorTeethAndIntrudePremolars.Upper;

          }
          document.querySelector('#OverJetItem #' + data.OverJetItem).click();
          document.querySelector('#OverJetItem #boxCorrectOverjet #' + data.CorrectOverjet)?.click();

          //PlaceElasticCutsOn
          var PlaceElasticCutsOn = JSON.parse(data.PlaceElasticCutsOn);
          if (typeof PlaceElasticCutsOn == "string") {
            PlaceElasticCutsOn = JSON.parse(PlaceElasticCutsOn);
          }
          for (var i = 0; i < PlaceElasticCutsOn.length; i++) {
            document.querySelector('#ElasticCutsButtonCutsItem #PlaceElasticCutsOn' + PlaceElasticCutsOn[i].name).checked = PlaceElasticCutsOn[i].value;
          }


          //PlaceButtonCutsOn
          let PlaceButtonCutsOn = JSON.parse(data.PlaceButtonCutsOn);
          if (typeof PlaceButtonCutsOn == "string") {
            PlaceButtonCutsOn = JSON.parse(PlaceButtonCutsOn);
          }
          for (var i = 0; i < PlaceButtonCutsOn.length; i++) {
            document.querySelector('#ElasticCutsButtonCutsItem #PlaceButtonCutsOn' + PlaceButtonCutsOn[i].name).checked = PlaceButtonCutsOn[i].value;
          }


          //TreatmentGoalsAdditionalInstructionsItem
          document.querySelector('#TreatmentGoalsAdditionalInstructionsItem textarea').value = data.TreatmentGoalsAdditionalInstructionsItem;
          $('#itemCreateOrder input').prop('disabled', true);
        }
      }
    }],
  Templete: "Views/Cases/Components/CreateOrder.html",
  Paramter: {
    filters: '@',
    buttonNext: '&',
    idPatient: '<',
    deleteCases: '<',
  }
}
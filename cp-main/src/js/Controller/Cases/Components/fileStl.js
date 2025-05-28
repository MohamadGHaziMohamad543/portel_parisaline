var CONT_fileStl=function($scope,$location,$sce,$rootScope,$cookies) {
    this.$onInit = function() {
        $scope.idPatient=this.idPatient;
        $scope.buttonNext=this.buttonNext;
        $scope.nextTab=()=>{
            this.buttonNext();
        };
        $scope.backTab=()=>{
            this.buttonBack();
        };
        var idIPR="";
        $scope.idCases=-1;
        var renderIPROption=(image,name)=>{
            if($scope.StopForm==true)
            {
                return;
            }
            var popoverTemplate=`
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
            
            $('#IPR'+name+' img').css('display','none');
            for(var key in $scope.IPRArray){
                if(key==name)
                {
                    $('#IPR'+name+' #IPRoptionExtraction'+$scope.IPRArray[key].I).attr('checked', true);
                }
            }
            $('.popover input').on("change",(e)=>{
                if(e.target.type=="radio")
                {
                    $scope.$apply(()=>{
                        for(var key in $scope.IPRArray){
                            if(key==name)
                            {
                                $scope.IPRArray[key].I=e.target.value;
                            }
                        }
                    });
                }
                else if(e.target.type=="number"){
                    $scope.$apply(()=>{
                        for(var key in $scope.IPRArray){
                            if(key==name)
                            {
                                $scope.IPRArray[key].T=e.target.value;
                            }
                        }
                    });
                }
            });
            $('.popover #closebtnProvver').click(()=>{
                $(idIPR).popover('hide');
                $(idIPR).removeClass("activeIPR");
            });
        }
        var renderIPRValue=(image,name,nameL)=>{
            if($scope.StopForm==true)
            {
                return;
            }
            var popoverTemplate=`
            <div id="IPR${name}">
                <div class="boxSVGIPR">
                    <div class="showSVGIPR">${$('#'+name).html()}</div>
                    <a class="titleSGIPR" style="font-size: 16px;width: 100px;">${name+''+nameL}</a>
                    <div class="showSVGIPR">${$('#'+nameL).html()}</div>
                </div>
                <div>
                    Value:<input type="number" min="0.0" step="0.1" class="inputItemsCreateOrder inputChekbox">
                </div>
                <a id="closebtnProvver"  class="btn btn-outline-info" style="cursor: pointer;width: 100%;margin-top: 5px;">Close</a>
            </div>
            `;
            $('.popover .popover-body').html(popoverTemplate);
            $('#IPR'+name+' img').css('display','none');
            for(var key in $scope.IPRArray){
                if(key==name)
                {
                    $('#IPR'+name+' input[type="number"]').val($scope.IPRArray[key].T);
                }
            }
            $('.popover input').on("change",(e)=>{
                if(e.target.type=="number")
                {
                    $scope.$apply(()=>{
                        for(var key in $scope.IPRArray){
                            if(key==name)
                            {
                                $scope.IPRArray[key].T=e.target.value;
                            }
                        }
                    });
                }
            });
            $('.popover #closebtnProvver').click(()=>{
                $(idIPR).popover('hide');
                $(idIPR).removeClass("activeIPR");
            });
        }
        $scope.renderIPR=()=>{
            $('.IPR').click((e)=>{
                console.log("start");
                if(!$(e.currentTarget).attr('idl'))
                {
                    console.log("1");
                   if(e.currentTarget===idIPR)
                   {
                    console.log("11");
                     $(e.currentTarget).popover('toggle');
                     $(e.currentTarget).toggleClass("activeIPR");
                     renderIPROption(e.currentTarget.innerHTML,e.currentTarget.id);
                     idIPR=null;
                   }
                   else{
                    console.log("12");
                     $('.IPR').popover('hide');
                     $('.IPR').removeClass("activeIPR");
                     $('.popover').remove();
                     setTimeout(() => {
                         
                         $(e.currentTarget).popover('show');
                         $(e.currentTarget).addClass("activeIPR");
                         renderIPROption(e.currentTarget.innerHTML,e.currentTarget.id); 
                         idIPR=e.currentTarget;
                     }, 4);
                   }
                }
                else{
                    console.log("2");
                   if(e.currentTarget===idIPR)
                   {
                    console.log("21");
                     $(e.currentTarget).popover('toggle');
                     renderIPRValue(e.currentTarget.innerHTML,e.currentTarget.id,$(e.currentTarget).attr('idl'));
                   }
                   else{
                    console.log("22");
                     $('.IPR').popover('hide');
                     $('.IPR').removeClass("activeIPR");
                     $('.popover').remove();
                     setTimeout(() => {
                         $(e.currentTarget).popover('show');
                         $(e.currentTarget).addClass("activeIPR");
                         renderIPRValue(e.currentTarget.innerHTML,e.currentTarget.id,$(e.currentTarget).attr('idl')); 
                         idIPR=e.currentTarget;
                     }, 4);
                   }
                }
       
              // $scope.setPostionToolTipe(e.currentTarget.offsetLeft,e.currentTarget.offsetTop);
             });
             
             $('.IPR').popover({
               content:'<strong class="color-red">Disabled..</strong>', 
               title:"",
               placement:"auto",
               container: 'body',
               html : true,
               boundary:"viewport",
               trigger:"manual"
            });
        }

        $scope.treatmentTypeItems=[
            {id:1,label:"Express"},
            {id:2,label:"Lite"},
            {id:3,label:"Moderate"},
            {id:4,label:"Complex"},
            {id:5,label:"Comprehensive"},
          ];
          $scope.treatmentType="1";
          $scope.incisorsMidlineItems=[
            {id:0,label:"None"},
            {id:1,label:"Improve"},
            {id:2,label:"Maintain"},
            {id:3,label:"Correct"}
          ];
          $scope.incisorsMidline="0";
         $scope.incisorsOverbiteItems=[
            {id:0,label:"None"},
            {id:1,label:"Maintain"},
            {id:2,label:"Increase"},
            {id:3,label:"Decrease"},
          ];
          $scope.incisorsOverbite="0";
          $scope.incisorsOverjetItems=[
            {id:0,label:"None"},
            {id:1,label:"Maintain"},
            {id:2,label:"Increase"},
            {id:3,label:"Decrease"},
          ];
          $scope.incisorsOverjet="0";
          $scope.posteriorSpacingItems=[
            {id:0,label:"None"},
            {id:1,label:"Close ALL Spaces"},
            {id:2,label:"Leave ALL Spaces"},
            {id:3,label:"Leave Space Anteriorly For Prosthesis"},
          ];
          $scope.posteriorSpacing="0";
          $scope.posteriorArchWdithItems=[
            {id:0,label:"None"},
            {id:1,label:"Maintain"},
            {id:2,label:"Expand"},
            {id:3,label:"Narrow"},
          ];
          $scope.posteriorArchWdith="0";
          $scope.posteriorPosteriorCrossBiteItems=[
            {id:0,label:"None"},
            {id:1,label:"Maintain"},
            {id:2,label:"Correct"},
            {id:3,label:"Expand"},
            {id:4,label:"Narrow"},
          ];
    
          $scope.posteriorPosteriorCrossBite="0";
          $scope.classDesiredMRigthItems=[
            {id:0,label:"None"},
            {id:1,label:"Class I"},
            {id:2,label:"Class II"},
            {id:3,label:"Class III"},
          ];
          $scope.classDesiredMRigth="0";
          $scope.classDesiredMLeftItems=[
            {id:0,label:"None"},
            {id:1,label:"Class I"},
            {id:2,label:"Class II"},
            {id:3,label:"Class III"},
          ];
          $scope.classDesiredMLeft="0";
          $scope.classDesiredRRigthItems=[
            {id:0,label:"None"},
            {id:1,label:"Class I"},
            {id:2,label:"Class II"},
            {id:3,label:"Class III"},
          ];
          $scope.classDesiredRRigth="0";
          $scope.classDesiredRLeftItems=[
            {id:0,label:"None"},
            {id:1,label:"Class I"},
            {id:2,label:"Class II"},
            {id:3,label:"Class III"},
          ];
          $scope.classDesiredRLeft="0";
          $scope.IPRArray={
            UR8:{T:0,I:0,number:11,name:'UR8'},
            UR7:{T:0,I:0,number:12,name:'UR7'},
            UR6:{T:0,I:0,number:13,name:'UR6'},
            UR5:{T:0,I:0,number:14,name:'UR5'},
            UR4:{T:0,I:0,number:15,name:'UR4'},
            UR3:{T:0,I:0,number:16,name:'UR3'},
            UR2:{T:0,I:0,number:17,name:'UR2'},
            UR1:{T:0,I:0,number:18,name:'UR1'},
            UL8:{T:0,I:0,number:21,name:'UL8'},
            UL7:{T:0,I:0,number:22,name:'UL7'},
            UL6:{T:0,I:0,number:23,name:'UL6'},
            UL5:{T:0,I:0,number:24,name:'UL5'},
            UL4:{T:0,I:0,number:25,name:'UL4'},
            UL3:{T:0,I:0,number:26,name:'UL3'},
            UL2:{T:0,I:0,number:27,name:'UL2'},
            UL1:{T:0,I:0,number:28,name:'UL1'},
            LR8:{T:0,I:0,number:31,name:'LR8'},
            LR7:{T:0,I:0,number:32,name:'LR7'},
            LR6:{T:0,I:0,number:33,name:'LR6'},
            LR5:{T:0,I:0,number:34,name:'LR5'},
            LR4:{T:0,I:0,number:35,name:'LR4'},
            LR3:{T:0,I:0,number:36,name:'LR3'},
            LR2:{T:0,I:0,number:37,name:'LR2'},
            LR1:{T:0,I:0,number:38,name:'LR1'},
            LL8:{T:0,I:0,number:41,name:'LL8'},
            LL7:{T:0,I:0,number:42,name:'LL7'},
            LL6:{T:0,I:0,number:43,name:'LL6'},
            LL5:{T:0,I:0,number:44,name:'LL5'},
            LL4:{T:0,I:0,number:45,name:'LL4'},
            LL3:{T:0,I:0,number:46,name:'LL3'},
            LL2:{T:0,I:0,number:47,name:'LL2'},
            LL1:{T:0,I:0,number:48,name:'LL1'},
          };

          $scope.ImpressionsItem="1";
          $scope.iPRInstructions="2";
          $scope.crowdingExpandMandibular=false;
          $scope.crowdingExpandMaxillar=false;
          $scope.crowdingProclineMandibular=false;
          $scope.crowdingProclineMaxillar=false;


          $scope.noAttachment=false;
          $scope.removeAttachmentonlaststage=false;
          $scope.removeAttachmentonstage=false;
          $scope.removeAttachmentonstageNumber=0;

          $scope.tretmentGols="";


          $scope.shippingId="0";

          $scope.ImpressionsFile=[];
          HTTPs.POST(CONFIG.serverUrl+"/GISTL",{id:this.idPatient}).then(res=>{
            res=JSON.parse(res);
            if(res.message==2000)
            {
                $scope.$apply(()=>{
                    $scope.ImpressionsFile=res.data;
                });
            }
          });
          $scope.DataAdress=[];
          $scope.getAllShipping=()=>{
                HTTPs.POST(CONFIG.serverUrl+"/GASH",{}).then(res=>{
                    res=JSON.parse(res);
                    if(res.error==0)
                    {
                        $scope.$apply(()=>{
                            $scope.DataAdress=res.data;
                            if(res.data.length != 0)
                            {
                                $scope.shippingId=res.data[0].id.toString();
                            }
                        });
                    }
                });
            }
          $scope.getAllShipping();
          $scope.StopForm=false;
          $scope.LoaderForm=false;
          $scope.Create=()=>{
              let Param={
                patientId:$scope.idPatient,
                impressions: $scope.ImpressionsItem,
                shippingId: $scope.shippingId,
                rx: $scope.IPRArray,
                treatmentType:$scope.treatmentType,
                incisorsMidline:$scope.incisorsMidline,
                incisorsOverbite:$scope.incisorsOverbite,
                incisorsOverjet:$scope.incisorsOverjet,
                posteriorSpacing:$scope.posteriorSpacing,
                posteriorArchWdith:$scope.posteriorArchWdith,
                posteriorPosteriorCrossBite:$scope.posteriorPosteriorCrossBite,
                crowdingProclineMaxillar:$scope.crowdingProclineMaxillar,
                crowdingExpandMaxillar:$scope.crowdingExpandMaxillar,
                crowdingProclineMandibular:$scope.crowdingProclineMandibular,
                crowdingExpandMandibular:$scope.crowdingExpandMandibular,
                classDesiredMRigth:$scope.classDesiredMRigth,
                classDesiredMLeft:$scope.classDesiredMLeft,
                classDesiredRRigth:$scope.classDesiredRRigth,
                classDesiredRLeft:$scope.classDesiredRLeft,
                noAttachment:$scope.noAttachment,
                removeAttachmentonlaststage:$scope.removeAttachmentonlaststage,
                removeAttachmentonstage:$scope.removeAttachmentonstage,
                removeAttachmentonstageNumber:$scope.removeAttachmentonstageNumber,
                iPRInstructions:$scope.iPRInstructions,
                tretmentGols:$scope.tretmentGols
              };
              if($scope.shippingId ==0 && $scope.ImpressionsItem=="1")
              {
                $('#shippingAddrss').addClass("errorInput");
                $('#shippingAddrss').removeClass("sucssInput");
                return;
              }
              $scope.StopForm=true;
              $scope.LoaderForm=true;
              HTTPs.POST(CONFIG.serverUrl+"/CC",Param).then(res=>{
                  res=JSON.parse(res);
                  if(res.error==0)
                  {
                      if(res.message==2000)
                      {
                        $scope.$apply(()=>{
                            $scope.LoaderForm=false;
                            $scope.idCases=res.data;
                            this.buttonNext();
                        });
                      }
                  }
                  console.log(res);
              });
          }

          $scope.hidePop=()=>{
              $('.popover #closebtnProvver').click();
          }
          $scope.getAll=()=>{
              HTTPs.POST(CONFIG.serverUrl+"/GAC",{id:$scope.idPatient}).then(res=>{
                res=JSON.parse(res);
                if(res.error==0)
                {
                    $scope.$apply(()=>{
                        if(res.data.length != 0)
                        {
                            $scope.ImpressionsItem=res.data[0].impressions.toString();
                            $scope.shippingId=res.data[0].shippingId.toString();
                            $scope.IPRArray=JSON.parse(res.data[0].rx);
                            $scope.treatmentType=res.data[0].treatmentType.toString();
                            $scope.incisorsMidline=res.data[0].incisorsMidline.toString();
                            $scope.incisorsOverbite=res.data[0].incisorsOverbite.toString();
                            $scope.incisorsOverjet=res.data[0].incisorsOverjet.toString();
                            $scope.posteriorSpacing=res.data[0].posteriorSpacing.toString();
                            $scope.posteriorArchWdith=res.data[0].posteriorArchWdith.toString();
                            $scope.posteriorPosteriorCrossBite=res.data[0].posteriorPosteriorCrossBite.toString();
                            $scope.crowdingProclineMaxillar=res.data[0].crowdingProclineMaxillar==1?true:false;
                            $scope.crowdingExpandMaxillar=res.data[0].crowdingExpandMaxillar==1?true:false;
                            $scope.crowdingProclineMandibular=res.data[0].crowdingProclineMandibular==1?true:false;
                            $scope.crowdingExpandMandibular=res.data[0].crowdingExpandMandibular==1?true:false;
                            $scope.classDesiredMRigth=res.data[0].classDesiredMRigth.toString();
                            $scope.classDesiredMLeft=res.data[0].classDesiredMLeft.toString();
                            $scope.classDesiredRRigth=res.data[0].classDesiredRRigth.toString();
                            $scope.classDesiredRLeft=res.data[0].classDesiredRLeft.toString();
                            $scope.noAttachment=res.data[0].noAttachment.toString();
                            $scope.removeAttachmentonlaststage=res.data[0].removeAttachmentonlaststage==1?true:false;
                            $scope.removeAttachmentonstage=res.data[0].removeAttachmentonstage==1?true:false;
                            $scope.removeAttachmentonstageNumber=res.data[0].removeAttachmentonstageNumber;
                            $scope.iPRInstructions=res.data[0].iPRInstructions.toString();
                            $scope.tretmentGols=res.data[0].tretmentGols;
                            $scope.idCases=res.data[0].id;
                            $scope.LoaderForm=false;
                            $scope.StopForm=true;
                        }
                       
                    });
                }
              });
          }
          $scope.getAll();
          $rootScope.$on("updateShippings",(event, valueFile)=>{
            $scope.getAllShipping();
          });
          $scope.StopForm=true;
          $scope.Edit=()=>{
            $scope.StopForm=false;
          }
          $scope.Save=()=>{
            let Param={
                id:$scope.idCases,
                patientId:$scope.idPatient,
                impressions: $scope.ImpressionsItem,
                shippingId: $scope.shippingId,
                rx: $scope.IPRArray,
                treatmentType:$scope.treatmentType,
                incisorsMidline:$scope.incisorsMidline,
                incisorsOverbite:$scope.incisorsOverbite,
                incisorsOverjet:$scope.incisorsOverjet,
                posteriorSpacing:$scope.posteriorSpacing,
                posteriorArchWdith:$scope.posteriorArchWdith,
                posteriorPosteriorCrossBite:$scope.posteriorPosteriorCrossBite,
                crowdingProclineMaxillar:$scope.crowdingProclineMaxillar,
                crowdingExpandMaxillar:$scope.crowdingExpandMaxillar,
                crowdingProclineMandibular:$scope.crowdingProclineMandibular,
                crowdingExpandMandibular:$scope.crowdingExpandMandibular,
                classDesiredMRigth:$scope.classDesiredMRigth,
                classDesiredMLeft:$scope.classDesiredMLeft,
                classDesiredRRigth:$scope.classDesiredRRigth,
                classDesiredRLeft:$scope.classDesiredRLeft,
                noAttachment:$scope.noAttachment,
                removeAttachmentonlaststage:$scope.removeAttachmentonlaststage,
                removeAttachmentonstage:$scope.removeAttachmentonstage,
                removeAttachmentonstageNumber:$scope.removeAttachmentonstageNumber,
                iPRInstructions:$scope.iPRInstructions,
                tretmentGols:$scope.tretmentGols
              };
              $scope.StopForm=true;
              $scope.LoaderForm=true;
              HTTPs.POST(CONFIG.serverUrl+"/CU",Param).then(res=>{
                  res=JSON.parse(res);
                  if(res.error==0)
                  {
                      if(res.message==2001)
                      {
                        $scope.$apply(()=>{
                            $scope.LoaderForm=false;
                            $scope.idCases=res.data;
                        });
                      }
                  }
              });
          }


          $scope.downloadSart=0;
          $scope.download=(url, filename)=> {
            $scope.downloadSart=1;
            fetch(url)
              .then(response => response.blob())
              .then(blob => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                link.click();
                $scope.$apply(()=>{
                    $scope.downloadSart=0;
                });
            })
            .catch(console.error);
          }
          $scope.serverStlUrl=CONFIG.serverImageUrl;
    }
}

adminApp.controller('fileStl', ['$scope','$location','$sce','$rootScope','$cookies',CONT_fileStl]);

adminApp.component('fileStl', {
    bindings: { 
        filters: '@',
        buttonNext: '&',
        idPatient: '<',
        status: '<',
        justPrintFile: '<',
        showModelBarcode:'&'
    },
    templateUrl: 'Views/Cases/Components/FileStl.html',
    controller: 'fileStl'
});



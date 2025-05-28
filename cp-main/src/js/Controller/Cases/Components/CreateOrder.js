$ANComponent.createOrder={
    FUN:['$scope','$location','$routeParams','$rootScope',
    function($scope,$location,$routeParams,$rootScope) {
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
                $scope.ImpressionsItem="2";
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
                    let virable=$scope.getAllValues();
                    if(virable === false)
                    {
                        return;
                    }
                    for( key in virable)
                    {
                       Param[key]=virable[key];
                    }
                    if($scope.typeOrder==1)
                    {
                       Param['typeOrder']=2;
                    }
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
                $scope.typeOrder=null;
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
                                if(res.data[0].typeOrder==null)
                                {
                                    $scope.typeOrder=0;
                                }
                                else{
                                    $scope.typeOrder=1;
                                    setTimeout(() => {
                                        $scope.$apply(()=>{
                                            newOrder();
                                            if(res.data[0].typeOrder==2)
                                            {
                                                loadValue(res.data[0]);
                                            }
                                        });
                                    }, 500);
                                }
                            }
                            else{
                                $scope.typeOrder=1;
                                setTimeout(() => {
                                    $scope.$apply(()=>{
                                        newOrder();
                                    });
                                }, 500);
                            }
                            
                        });
                    }
                    });
                }
                $scope.getAll();
                $rootScope.$on("updateShippings",(event, valueFile)=>{
                $scope.getAllShipping();
                });
                
                $scope.Edit=()=>{
                    $scope.StopForm=false;
                    $('#itemCreateOrder input').prop('disabled', false);
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
                    if($scope.typeOrder==1){
                        let virable=$scope.getAllValues();
                        if(virable === false)
                        {
                            return;
                        }
                        for( key in virable)
                        {
                           Param[key]=virable[key];
                        }
                        if($scope.typeOrder==1)
                        {
                           Param['typeOrder']=2;
                        }
                    }
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
                                    $('#itemCreateOrder input').prop('disabled', true);
                                });
                            }
                        }
                    });
                }
                $scope.downlloadPdf=()=>{
                var RenderIpr=(IPRArray,imagebase64,CaseNumber,PatientName,Gender,dateNow,dataOfBarth,PosteriorSpacing,PosteriorArchWidth,PosteriorPosteriorBite,IncisorsMidline,IncisorsOverbite,IncisorsOverjet,ClassDesiredMolarRelationshipRigth,ClassDesiredMolarRelationshipLeft,ClassDesiredCanineRelationshipRigth,ClassDesiredCanineRelationshipLeft,ProclineMandibular,ProclineMaxillar,ExpandMandibular,ExpandMaxillar,NoAttachmentonanterior,teethRemoveAttachmentonStage,RemoveAttachmentonLastStage,NoIPRRequired,tretmentGols,shiipingAddress)=>{
                    var today = dateNow;
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = today.getFullYear();
                    
                    today = dd+mm +yyyy ;
                    dateNow=today;
    
                    var today = dataOfBarth;
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = today.getFullYear();
                    today = dd+mm +yyyy ;
                    dataOfBarth=today;
                    var Item=`
                    <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1073.5 1511">
                        <defs>
                            <style>
                                .mj {
                                    font-size: 12.25px;
                                }
                
                                .mj,
                                .mk,
                                .ml,
                                .mm {
                                    fill: #fff;
                                }
                
                                .mj,
                                .mn,
                                .ml,
                                .mo,
                                .mp {
                                    font-family: HelveticaNowDisplay-Medium, HelveticaNowDisplay Medium;
                                }
                
                                .mq {
                                    font-size: 11.18px;
                                }
                
                                .mq,
                                .mr,
                                .ms,
                                .mt,
                                .mu,
                                .mv {
                                    font-family: HelveticaNowDisplay-Regular, HelveticaNowDisplay Regular;
                                }
                
                                .mw {
                                    fill: #ffe5c8;
                                }
                
                                .mx {
                                    fill: #ffd8a9;
                                }
                
                                .my {
                                    fill: #ffd6a6;
                                }
                
                                .n {
                                    fill: #665e55;
                                }
                
                                .na {
                                    fill: #d12026;
                                }
                
                                .nb {
                                    fill: #dbdfdf;
                                }
                
                                .nc {
                                    fill: #dfeee6;
                                }
                
                                .nd {
                                    fill: #231f20;
                                }
                
                                .ne {
                                    fill: #7a74d1;
                                }
                
                                .nf {
                                    font-family: AdobeArabic-Regular, Adobe Arabic;
                                    font-size: 27.08px;
                                }
                
                                .mn,
                                .mr,
                                .ms {
                                    font-size: 16px;
                                }
                
                                .mr {
                                    fill: #3f3f3f;
                                }
                
                                .ml,
                                .mo {
                                    font-size: 22.56px;
                                }
                
                                .ng {
                                    stroke: #000;
                                }
                
                                .ng,
                                .nh,
                                .ni {
                                    fill: none;
                                    stroke-miterlimit: 10;
                                }
                
                                .nh,
                                .ni {
                                    stroke: #474747;
                                }
                
                                .mm {
                                    fill-rule: evenodd;
                                }
                
                                .mp {
                                    font-size: 19.05px;
                                }
                
                                .mt {
                                    font-size: 12.67px;
                                }
                
                                .mu {
                                    font-size: 13.19px;
                                }
                
                                .ni {
                                    stroke-width: .5px;
                                }
                
                                .mv {
                                    font-size: 13.62px;
                                }
                            </style>
                        </defs>
                        <rect class="mk" x=".5" width="1073" height="1511"></rect>
                        <g>
                            <path class="ne" d="M108.25,90.44h-13c-1.1,0-1.99,.89-1.99,1.99v30.75c0,.75,.61,1.36,1.36,1.36h3.75c.75,0,1.36-.61,1.36-1.36v-10.57h8.52c3.8,0,6.76-1,8.88-2.99,2.12-2,3.18-4.68,3.18-8.07s-1.06-6.12-3.18-8.12c-2.12-2-5.09-2.99-8.88-2.99m4.05,15.21c-1.01,.94-2.45,1.41-4.33,1.41h-8.24v-11.06h8.24c1.88,0,3.33,.48,4.33,1.44,1.01,.96,1.51,2.33,1.51,4.12s-.5,3.15-1.51,4.1">
                            </path>
                            <path class="ne" d="M143.6,106.67c0-4.95-3.43-7.42-10.3-7.42-6.33,0-9.96,2.26-10.9,6.79-.17,.84,.47,1.64,1.33,1.64h3.24c.62,0,1.17-.42,1.31-1.02,.22-.91,.61-1.58,1.18-2.02,.77-.59,2.03-.89,3.78-.89,1.63,0,2.79,.25,3.47,.74,.68,.5,1.03,1.27,1.03,2.32,0,.86-.27,1.51-.82,1.94-.54,.43-1.44,.73-2.68,.89l-3.74,.33c-6.32,.64-9.48,3.21-9.48,7.71,0,2.33,.81,4.15,2.42,5.46,1.61,1.31,3.77,1.96,6.49,1.96,3.64,0,6.29-1.2,7.95-3.59,.12,1.16,.28,2.02,.48,2.59,.08,.24,.34,.43,.59,.43h4.65c.42,0,.72-.41,.56-.79-.39-.95-.58-2.25-.58-3.9v-13.17Zm-5.84,8.1c0,1.95-.59,3.44-1.77,4.48-1.18,1.04-2.71,1.56-4.6,1.56-1.34,0-2.37-.3-3.09-.89-.72-.59-1.08-1.41-1.08-2.47s.34-1.86,1.03-2.42c.69-.56,1.83-.93,3.43-1.12l3.26-.38c.81-.1,1.48-.26,2-.5,.39-.17,.82,.12,.82,.55v1.19Z">
                            </path>
                            <path class="ne" d="M154.04,104.23v-2.72c0-.93-.76-1.69-1.69-1.69h-2.47c-.93,0-1.69,.76-1.69,1.69v21.67c0,.75,.61,1.36,1.36,1.36h3.32c.75,0,1.36-.61,1.36-1.36v-11.19c0-2.27,.62-3.98,1.84-5.15,1.23-1.17,2.99-1.75,5.29-1.75h1.53v-5.56c-.45-.06-.94-.1-1.48-.1-3.54,0-6,1.6-7.38,4.79">
                            </path>
                            <path class="ne" d="M195.73,112.51c-1.36-1.18-3.54-2.04-6.54-2.58l-3.11-.48c-1.47-.25-2.52-.61-3.16-1.08-.64-.46-.96-1.11-.96-1.94,0-1.92,1.44-2.87,4.31-2.87,1.69,0,2.97,.31,3.83,.93,.63,.46,1.05,1.14,1.25,2.04,.14,.64,.72,1.09,1.38,1.09h2.87c.89,0,1.57-.82,1.4-1.69-.85-4.46-4.43-6.69-10.73-6.69-3.26,0-5.78,.66-7.57,1.99-1.79,1.32-2.68,3.15-2.68,5.48,0,4.09,2.7,6.58,8.1,7.47l2.82,.48c1.82,.32,3.08,.72,3.78,1.2,.7,.48,1.05,1.16,1.05,2.06,0,1.98-1.63,2.97-4.89,2.97-1.82,0-3.15-.32-4-.96-.64-.48-1.08-1.22-1.33-2.21-.15-.62-.73-1.04-1.37-1.04h-3.09c-.9,0-1.58,.83-1.4,1.71,.94,4.54,4.63,6.81,11.08,6.81,3.48,0,6.18-.67,8.09-2.01,1.92-1.34,2.87-3.26,2.87-5.75,0-2.11-.68-3.75-2.03-4.93">
                            </path>
                            <path class="ne" d="M226.68,140.42h0c-8.3,0-15.89-3.26-20.54-8.78-.37-.44-1-.52-1.45-.18l-2.73,2.08c-.47,.36-.57,1.05-.19,1.5,5.68,6.85,14.91,10.91,24.91,10.91h0c10.01,0,19.23-4.06,24.92-10.92,.38-.46,.28-1.14-.19-1.5l-2.73-2.08c-.45-.34-1.09-.26-1.45,.18-4.64,5.52-12.24,8.78-20.54,8.78">
                            </path>
                            <path class="ne" d="M240.42,91.15h-3.42c-.93,0-1.69,.76-1.69,1.69v31.06c0,.75,.61,1.36,1.36,1.36h3.32c.75,0,1.36-.61,1.36-1.36v-31.81c0-.51-.42-.93-.93-.93">
                            </path>
                            <path class="ne" d="M252.27,99.34l-6.03-1.83v27.1c0,.33,.27,.6,.6,.6h4.84c.33,0,.6-.27,.6-.6v-25.27Z">
                            </path>
                            <path class="ne" d="M166.15,99.38l6.03-1.83v27.1c0,.33-.27,.6-.6,.6h-4.84c-.33,0-.6-.27-.6-.6v-25.27Z">
                            </path>
                            <path class="ne" d="M270.66,99.94c-3.25,0-5.82,1.37-7.7,4.11v-1.85c0-.93-.76-1.69-1.69-1.69h-2.46c-.93,0-1.69,.76-1.69,1.69v22.4c0,.33,.27,.6,.6,.6h4.83c.33,0,.6-.27,.6-.6v-13.23c0-2.56,.93-4.39,2.78-5.49,.92-.54,1.98-.77,3.04-.73,2.89,.1,4.33,1.67,4.33,4.68v14.76c0,.33,.27,.6,.6,.6h4.83c.33,0,.6-.27,.6-.6v-15.77c0-2.84-.77-5.03-2.32-6.58-1.55-1.55-3.66-2.32-6.34-2.32">
                            </path>
                            <path class="ne" d="M295.31,99.94c-3.64,0-6.59,1.18-8.85,3.54-2.23,2.36-3.35,5.49-3.35,9.38s1.13,7.02,3.4,9.38c2.26,2.36,5.23,3.54,8.9,3.54,2.94,0,5.42-.74,7.46-2.23,2.04-1.48,3.38-3.48,4.02-6.01h-5.79c-1.02,2.36-2.9,3.54-5.65,3.54-1.85,0-3.33-.53-4.43-1.6-1.1-1.07-1.76-2.66-1.99-4.76h18.47v-1.44c0-3.99-1.1-7.21-3.3-9.67-2.2-2.46-5.17-3.68-8.9-3.68m-6.22,10.58c.57-3.92,2.63-5.89,6.17-5.89,1.72,0,3.13,.53,4.21,1.58,1.08,1.05,1.75,2.49,2.01,4.31h-12.39Z">
                            </path>
                            <path class="ne" d="M309.38,100.52c0-.36-.15-.61-.42-.74,.33-.15,.5-.42,.5-.82,0-.32-.11-.58-.34-.76-.23-.18-.54-.27-.94-.27h-1.61v3.55h.8v-1.32h.75c.16,0,.27,.03,.33,.1,.06,.06,.1,.18,.12,.36l.03,.37c.02,.23,.06,.39,.12,.49h.85c-.08-.1-.13-.26-.15-.49l-.04-.48Zm-1.24-1.01h-.76v-.87h.74c.34,0,.51,.14,.51,.43s-.16,.44-.49,.44">
                            </path>
                            <path class="ne" d="M307.95,96.31c-.99,0-1.83,.33-2.51,1-.69,.67-1.03,1.48-1.03,2.44s.34,1.76,1.03,2.43c.68,.67,1.52,1,2.51,1s1.84-.33,2.53-1c.68-.67,1.01-1.48,1.01-2.43s-.34-1.78-1.01-2.44c-.68-.67-1.53-1-2.53-1m1.97,5.36c-.52,.51-1.18,.76-1.97,.76s-1.42-.26-1.96-.78c-.53-.51-.79-1.14-.79-1.9s.26-1.42,.79-1.93c.54-.52,1.19-.78,1.96-.78s1.44,.26,1.97,.78c.52,.52,.78,1.16,.78,1.93s-.26,1.4-.78,1.92">
                            </path>
                            <path class="ne" d="M208.68,117.73h.01l1.95-5.51h0l1.29-3.69c1.25-3.34,2.47-6.72,3.65-10.16,.17-.5,.87-.49,1.05,0,1.46,4.23,2.69,7.61,3.69,10.15l1.34,3.69h-.04l1.99,5.51h.02l2.36,6.62c.19,.54,.7,.9,1.28,.9h3.91c.95,0,1.61-.96,1.26-1.85l-11.85-30.56c-.4-1.02-1.38-1.7-2.48-1.7h-3.91c-1.1,0-2.09,.68-2.49,1.72l-11.63,30.55c-.34,.89,.32,1.84,1.27,1.84h3.73c.58,0,1.09-.36,1.28-.91l2.32-6.61Z">
                            </path>
                            <path class="ne" d="M333.14,163.87H71.61c-3.78,0-6.86-3.08-6.86-6.86V73.39c0-3.78,3.08-6.86,6.86-6.86H333.14c3.78,0,6.86,3.08,6.86,6.86v83.62c0,3.78-3.08,6.86-6.86,6.86M71.61,70.35c-1.68,0-3.04,1.37-3.04,3.04v83.62c0,1.68,1.36,3.04,3.04,3.04H333.14c1.68,0,3.04-1.36,3.04-3.04V73.39c0-1.68-1.36-3.04-3.04-3.04H71.61Z">
                            </path>
                            <path class="ne" d="M247.57,91.18h3.37c.71,0,1.29,.58,1.29,1.29v4.39l-5.94-1.83v-2.56c0-.71,.58-1.29,1.29-1.29Z"></path>
                            <path class="ne" d="M170.85,91.18h-3.37c-.71,0-1.29,.58-1.29,1.29v4.39l5.94-1.83v-2.56c0-.71-.58-1.29-1.29-1.29Z"></path>
                        </g>
                        <image width="180" x="830" y="80" height="200" hi="" href="${imagebase64}" ></image>
                        <text class="mo" transform="translate(64.22 353.98)">
                            <tspan x="0" y="0" font-weight="700">Treatment Goals</tspan>
                        </text><text class="mo" transform="translate(68.22 259.98)">
                            <tspan x="0" y="0" id="caseNumber">CASE NO: #: ${CaseNumber} </tspan>
                            <tspan x="114.48" y="0"></tspan>
                            <tspan x="218.63" y="0">
                            </tspan>
                        </text>
                
                        <text class="mp" transform="translate(72.22 603.98)">
                            <tspan x="0" y="0" font-weight="700">Patient Name</tspan>
                        </text>
                        <text class="mp" transform="translate(200.22 603.98)" id="PatientName">
                        ${PatientName}
                
                        </text>
                        <text class="mp" transform="translate(72.22 650.98)">
                            <tspan x="0" y="0" font-weight="700">Date Of Birth</tspan>
                        </text><text class="mp" transform="translate(72.22 710.98)">
                            <tspan x="0" y="0" font-weight="700">Posterior</tspan>
                        </text><text class="mp" transform="translate(72.22 755.98)">
                            <tspan x="0" y="0" font-weight="700">Incisors</tspan>
                        </text><text class="mp" transform="translate(72.22 804.98)">
                            <tspan x="0" y="0" font-weight="700">Crowding</tspan>
                        </text><text class="mp" transform="translate(72.22 883.98)">
                            <tspan x="0" y="0" font-weight="700">Class Desired</tspan>
                        </text><text class="mp" transform="translate(72.22 1040.98)">
                            <tspan x="0" y="0" font-weight="700">Attachment</tspan>
                        </text><text class="mp" transform="translate(72.22 1409.98)">
                            <tspan x="0" y="0" font-weight="700">shipping address : ${shiipingAddress}</tspan>
                        </text><text class="mp" transform="translate(72.22 1099.98)">
                            <tspan x="0" y="0" font-weight="700">Ipr Instructions</tspan>
                        </text><text class="mp" transform="translate(575.22 650.98)">
                            <tspan x="0" y="0" font-weight="700">Gender</tspan>
                        </text>
                        <rect class="ne" x="369" y="234.01" width="56.86" height="28.43" rx="3.66" ry="3.66"></rect><text class="mj" transform="translate(387.51 253.17)">
                            <tspan x="0" y="0">Date</tspan>
                        </text>
                        <g><text class="mt" transform="translate(447.74 270.47)">
                                <tspan x="0" y="0">D</tspan>
                            </text><text class="mt" transform="translate(488.49 270.47)">
                                <tspan x="0" y="0">D</tspan>
                            </text><text class="mt" transform="translate(543.6 270.47)">
                                <tspan x="0" y="0">M</tspan>
                            </text><text class="mt" transform="translate(585.29 270.47)">
                                <tspan x="0" y="0">M</tspan>
                            </text><text class="mt" transform="translate(640.74 270.47)">
                                <tspan x="0" y="0">Y</tspan>
                            </text><text class="mt" transform="translate(682.44 270.47)">
                                <tspan x="0" y="0">Y</tspan>
                            </text><text class="mt" transform="translate(723.18 270.47)">
                                <tspan x="0" y="0">Y</tspan>
                            </text>
                            <text class="mt" transform="translate(763.93 270.47)">
                                <tspan x="0" y="0">Y</tspan>
                            </text><text class="mt" transform="translate(763.93 249.47)" id="Date_Y_4">
                            ${dateNow[7]}
                            </text>
                
                            <text class="mt" transform="translate(725.93 249.47)" id="Date_Y_3">
                            ${dateNow[6]}
                            </text>
                
                            <text class="mt" transform="translate(680.93 249.47)" id="Date_Y_2">
                            ${dateNow[5]}
                            </text><text class="mt" transform="translate(640 249.47)" id="Date_Y_1">
                            ${dateNow[4]}
                            </text>
                            <text class="mt" transform="translate(584 249.47)" id="Date_M_2">
                            ${dateNow[3]}
                            </text>
                            <text class="mt" transform="translate(544 249.47)" id="Date_M_1">
                            ${dateNow[2]}
                            </text>
                            <text class="mt" transform="translate(488 249.47)" id="Date_D_2">
                            ${dateNow[1]}
                            </text>
                            <text class="mt" transform="translate(446 249.47)" id="Date_D_1">
                                ${dateNow[0]}
                            </text>
                            <line class="nh" x1="434.38" y1="254.86" x2="469.45" y2="254.86"></line>
                            <line class="nh" x1="475.13" y1="255.33" x2="510.19" y2="255.33"></line>
                            <line class="nh" x1="531.04" y1="255.33" x2="566.1" y2="255.33"></line>
                            <line class="nh" x1="571.79" y1="255.33" x2="606.85" y2="255.33"></line>
                            <line class="nh" x1="627.7" y1="255.33" x2="662.76" y2="255.33"></line>
                            <line class="nh" x1="668.44" y1="255.33" x2="703.51" y2="255.33"></line>
                            <line class="nh" x1="709.19" y1="255.33" x2="744.25" y2="255.33"></line>
                            <line class="nh" x1="749.94" y1="255.33" x2="785" y2="255.33"></line>
                        </g><text class="mn" transform="translate(178.67 711.5)">
                            <tspan x="0" y="0">Spacing: ${PosteriorSpacing}</tspan>
                        </text><text class="mn" transform="translate(199.67 755.5)">
                            <tspan x="0" y="0">Midline: ${IncisorsMidline}</tspan>
                        </text><text class="ms" transform="translate(226.12 810.5)">
                            <tspan x="0" y="0">Procline Mandibular</tspan>
                        </text><text class="ms" transform="translate(408.88 810.5)">
                            <tspan x="0" y="0">Procline Maxillar</tspan>
                        </text><text class="ms" transform="translate(570.79 810.5)">
                            <tspan x="0" y="0">Expand Maxillar</tspan>
                        </text><text class="ms" transform="translate(749.69 810.5)">
                            <tspan x="0" y="0">Expand Mandibular</tspan>
                        </text><text class="mn" transform="translate(228.67 884.5)">
                            <tspan x="0" y="0">Molar Relationship Rigth: ${ClassDesiredMolarRelationshipRigth}</tspan>
                        </text><text class="mn" transform="translate(228.67 947.5)">
                            <tspan x="0" y="0">Molar Relationship Left: ${ClassDesiredMolarRelationshipLeft}</tspan>
                        </text><text class="mn" transform="translate(228.67 915.5)">
                            <tspan x="0" y="0">Canine Relationship Rigth: ${ClassDesiredCanineRelationshipRigth}</tspan>
                        </text><text class="mn" transform="translate(228.67 975.5)">
                            <tspan x="0" y="0">Canine Relationship Left: ${ClassDesiredCanineRelationshipLeft}</tspan>
                        </text><text class="mn" transform="translate(430.67 755.5)">
                            <tspan x="0" y="0">Overbite: ${IncisorsOverbite}</tspan>
                        </text><text class="mn" transform="translate(655.67 755.5)">
                            <tspan x="0" y="0">Overjet: ${IncisorsOverjet}</tspan>
                        </text><text class="mn" transform="translate(430.01 711.5)">
                            <tspan x="0" y="0">Arch Width: ${PosteriorArchWidth}</tspan>
                        </text><text class="mn" transform="translate(661.82 711.5)">
                            <tspan x="0" y="0">Posterior Bite:${PosteriorPosteriorBite}</tspan>
                        </text><text class="mn" transform="translate(711.82 650.5)">
                            <tspan x="0" y="0">Male</tspan>
                        </text><text class="mn"  transform="translate(828.32 651)">
                            <tspan x="0" y="0">Female</tspan>
                        </text>
                        <rect class="nh" x="38.5" y="541" width="996" height="943" rx="9.67" ry="9.67"></rect>
                        <g>
                            <text class="mq" id="dateOfBirth_D_1" transform="translate(202.4 650.32)">${dataOfBarth[0]}</text>
                            <text class="mq" id="dateOfBirth_D_2" transform="translate(238.4 650.32)">${dataOfBarth[1]}</text>
                            <text class="mq" id="dateOfBirth_M_1" transform="translate(286.99 650.32)">${dataOfBarth[2]}</text>
                            <text class="mq" id="dateOfBirth_M_2" transform="translate(324 650.32)">${dataOfBarth[3]}</text>
                            <text class="mq" id="dateOfBirth_Y_1" transform="translate(373 650.32)">${dataOfBarth[4]}</text>
                            <text class="mq" id="dateOfBirth_Y_2" transform="translate(408 650.32)">${dataOfBarth[5]}</text>
                            <text class="mq" id="dateOfBirth_Y_3" transform="translate(445 650.32)">${dataOfBarth[6]}</text>
                            <text class="mq" id="dateOfBirth_Y_4" transform="translate(480 650.32)">${dataOfBarth[7]}</text>
                            <text class="mq" transform="translate(202.4 668.32)">
                                <tspan x="0" y="0">D</tspan>
                            </text><text class="mq" transform="translate(238.36 668.32)">
                                <tspan x="0" y="0">D</tspan>
                            </text><text class="mq" transform="translate(286.99 668.32)">
                                <tspan x="0" y="0">M</tspan>
                            </text><text class="mq" transform="translate(323.78 668.32)">
                                <tspan x="0" y="0">M</tspan>
                            </text><text class="mq" transform="translate(372.71 668.32)">
                                <tspan x="0" y="0">Y</tspan>
                            </text><text class="mq" transform="translate(409.5 668.32)">
                                <tspan x="0" y="0">Y</tspan>
                            </text><text class="mq" transform="translate(445.45 668.32)">
                                <tspan x="0" y="0">Y</tspan>
                            </text><text class="mq" transform="translate(481.41 668.32)">
                                <tspan x="0" y="0">Y</tspan>
                            </text>
                            <line class="nh" x1="190.62" y1="654.54" x2="221.56" y2="654.54"></line>
                            <line class="nh" x1="226.57" y1="654.96" x2="257.51" y2="654.96"></line>
                            <line class="nh" x1="275.91" y1="654.96" x2="306.84" y2="654.96"></line>
                            <line class="nh" x1="311.86" y1="654.96" x2="342.8" y2="654.96"></line>
                            <line class="nh" x1="361.2" y1="654.96" x2="392.13" y2="654.96"></line>
                            <line class="nh" x1="397.15" y1="654.96" x2="428.09" y2="654.96"></line>
                            <line class="nh" x1="433.11" y1="654.96" x2="464.04" y2="654.96"></line>
                            <line class="nh" x1="469.06" y1="654.96" x2="500" y2="654.96"></line>
                        </g>
                        <rect fill="#${Gender==2?'7a74d1':'fff'}" stroke="#000" x="806.5" y="638" width="16" height="16"></rect>
                        <rect fill="#${Gender==1?'7a74d1':'fff'}" stroke="#000" x="689.5" y="638" width="16" height="16"></rect>
                        <rect fill="#${ProclineMandibular==0?'fff':'7a74d1'}" stroke="#000" x="198.5" y="797" width="16" height="16"></rect>
                
                
                        <rect fill="#${ProclineMaxillar==0?'fff':'7a74d1'}" stroke="#000" x="385.5" y="797" width="16" height="16"></rect>
                        <rect fill="#${ExpandMandibular==0?'fff':'7a74d1'}" stroke="#000" x="548.5" y="797" width="16" height="16"></rect>
                        <rect fill="#${ExpandMaxillar==0?'fff':'7a74d1'}" stroke="#000" x="724.5" y="797" width="16" height="16"></rect>
                        <rect class="ne" x="385" y="521.5" width="303" height="40" rx="3.66" ry="3.66"></rect>
                        <text class="ml" transform="translate(474.66 548.98)">
                            <tspan x="0" y="0">Case Details</tspan>
                        </text>
                        
                        
                        <path id="p" class="mw" d="M564.48,1295.14s.18,1.13,.49,2.93c-.3-1.8-.49-2.93-.49-2.93-.04-.47-.06-.94-.06-1.4,0,.46,.02,.92,.06,1.39">
                        </path>
                        <g id="IPR_UR8" ${IPRArray.UR8.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="jj" class="nb" d="M183.7,1237.82s0,0-.01,0c0,0,0,0,.01,0"></path>
                            <path id="jk" class="nb" d="M177.47,1237.91c-.08-.02-.17-.05-.25-.08,.08,.02,.17,.05,.25,.08"></path>
                            <path id="jl" class="nb" d="M178,1238.04c-.08-.02-.16-.04-.24-.05,.08,.02,.16,.04,.24,.05"></path>
                            <path id="jm" class="nb" d="M183.33,1237.92h0"></path>
                            <path id="jn" class="nb" d="M182.93,1238.01s-.02,0-.03,0c0,0,.02,0,.03,0"></path>
                            <path id="jo" class="mx" d="M183.68,1237.83c-.11,.03-.23,.06-.35,.09,.12-.03,.24-.06,.35-.09"></path>
                            <path id="jp" class="mx" d="M192.59,1233.87s-1.93,2.93-6.51,3.01h-.03c-.75,.41-1.54,.73-2.36,.95,.82-.22,1.61-.53,2.36-.93h.03c4.58-.09,6.51-3.02,6.51-3.02,2.58-5.52,3.4-9.99,3.42-13.42-.03,3.43-.85,7.89-3.42,13.42">
                            </path>
                            <path id="jq" class="mx" d="M182.91,1238.02c-.43,.09-.86,.16-1.29,.2,.43-.05,.86-.11,1.29-.2"></path>
                            <path id="jr" class="mx" d="M183.3,1237.93c-.12,.03-.24,.06-.37,.08,.13-.03,.25-.05,.37-.08"></path>
                            <path id="js" class="mx" d="M177.76,1237.98c-.1-.02-.2-.05-.3-.08,.1,.03,.2,.05,.3,.08"></path>
                            <path id="jt" class="mx" d="M178.36,1238.1c-.12-.02-.24-.04-.36-.07,.12,.03,.24,.05,.36,.07"></path>
                            <path id="ju" class="nc" d="M193,1210.44c-.4-.75-.75-1.53-1.06-2.32h0c-.6-.25-1.18-.47-1.75-.66,.3,.76,.64,1.5,1.02,2.22,.27,.5,.56,1,.88,1.49,0,0,5.58,7.22-1.29,21.95,0,0-1.93,2.93-6.51,3.01,0,0-.02,0-.03,.01-.06,.03-.24,.13-.5,.25,.75,.24,1.51,.41,2.29,.51h.03c4.58-.09,6.51-3.02,6.51-3.02,2.57-5.52,3.4-9.99,3.42-13.42,.04-5.71-2.14-8.53-2.14-8.53-.32-.48-.61-.98-.88-1.49">
                            </path>
                            <path id="jv" class="mk" d="M183.77,1236.38c-2.76,1.28-5.9,1.48-8.8,.55l.03,.02c.08,.04,.17,.08,.26,.13l.3,.15c.09,.04,.18,.08,.27,.12s.19,.08,.29,.12c.1,.04,.18,.07,.27,.1s.19,.07,.28,.1,.18,.06,.27,.09,.19,.06,.28,.08,.17,.05,.25,.08c.1,.03,.2,.05,.3,.08,.08,.02,.16,.04,.24,.05,.12,.03,.24,.05,.36,.07,.08,.01,.17,.03,.25,.04,.14,.02,.28,.04,.42,.06,.07,0,.14,.01,.2,.02l.31,.03h.21c.1,.02,.19,.02,.29,.02h.68c.1,0,.2,0,.3-.01h.16c.11-.02,.22-.03,.33-.04,.04,0,.08,0,.11,0,.43-.05,.86-.11,1.29-.2,0,0,.02,0,.03,0,.13-.03,.25-.05,.37-.08,.01,0,.02,0,.03,0,.12-.03,.24-.06,.35-.09,0,0,0,0,.01,0,.82-.22,1.61-.53,2.36-.93-.78-.1-1.54-.28-2.29-.51">
                            </path>
                            <path id="jw" class="mw" d="M167.99,1207.59c.62,.33,1.21,.72,1.74,1.18,1.35,.47,2.84,.27,4-.55,.33-.24,.64-.51,.9-.82,0,0,6.69-3.63,16.73,.54-1.17-3.11-1.82-6.38-1.92-9.7,1.15-20.74-3.5-25.88-3.5-25.88-3.86-8.01-4.58-13.44-4.58-13.44-1.71-4.15-3.72-2.22-3.72-2.22-.76,.43-1.3,1.15-1.5,1.99-1.8,4.92-1.07,16.88-1.07,16.88-1.3-4.15-3.37-8.02-6.1-11.41-.7-.89-1.46-1.74-2.26-2.53-4.86-5.58-5.36-1.07-5.36-1.07-.43,2.65,1.79,7.86,1.79,7.86,2.29,2.93,.5,13.94,.5,13.94-4.22,7.36-1.69,15.32-1.69,15.32,1.33,3.25-.43,9.38-.47,9.48,.27-.07,.55-.14,.83-.2,1.9-.49,3.92-.27,5.67,.62">
                            </path>
                            <path id="jx" class="mk" d="M193.31,1211.75c-.32-.48-.61-.98-.88-1.49-.4-.75-.76-1.53-1.06-2.32-10.04-4.17-16.73-.54-16.73-.54-.27,.31-.57,.58-.9,.82-1.17,.82-2.66,1.02-4,.55-.54-.46-1.12-.85-1.74-1.18-1.75-.89-3.77-1.11-5.67-.62-.28,.06-.56,.13-.83,.2-3.23,7.9-10.85,15.56,.18,27.06,2.51,.62,6.25,.23,10.78-2.69,0,0,1.43-1.84,4.39,1.09,0,0,3.79,3.46,8.65,4.09,0,0,.02,0,.03-.02,4.58-.07,6.51-3,6.51-3,6.86-14.73,1.29-21.95,1.29-21.95">
                            </path>
                            <path id="jy" class="my" d="M176.15,1158.69c-2.02-7.11-4.66-5.85-4.66-5.85-3.61-.43-.92,7.26-2.51,11.32,2.73,3.39,4.8,7.26,6.1,11.41,0,0-.73-11.97,1.07-16.88">
                            </path>
                            <path id="k" class="nb" d="M172.45,1231.54c-4.53,2.92-8.27,3.31-10.78,2.69,.1,.1,.18,.2,.28,.3,2.46,2.5,10.13,.68,10.13,.68,3.74,3.21,9.06,3.81,13.42,1.52-4.86-.63-8.65-4.09-8.65-4.09-2.96-2.93-4.39-1.09-4.39-1.09">
                            </path>
                            <path id="ka" class="mx" d="M176.05,1178.79c1.35,5.2,2.4,10.47,3.14,15.78,.43,2.5,.57,5.05,.43,7.58-.1,1.09-1.8,4.68-2.79,1.95-.34-.94,.24-2.54,.25-3.5,.07-3.1-.05-6.19-.37-9.27-.26-2.85-.57-5.69-.92-8.53-.15-1.2-.31-2.4-.47-3.6-.05-.38,.51-1.22,.72-.41">
                            </path>
                            <path id="kb" class="mx" d="M179.06,1156.45c.46,.56,.83,1.19,1.09,1.87,0,0,.72,5.43,4.58,13.44,0,0,4.65,5.15,3.5,25.88,.1,3.32,.75,6.6,1.92,9.7,.01,.03,.03,.07,.04,.1,.57,.19,1.15,.41,1.75,.66-1.17-3.1-1.82-6.38-1.92-9.7h0c.13-2.27,.18-4.35,.18-6.26,0-15.54-3.68-19.62-3.68-19.62-3.86-8.01-4.58-13.44-4.58-13.44-.06-.15-.13-.29-.19-.43l-.02-.03c-.06-.12-.11-.23-.17-.34,0-.02-.02-.04-.03-.06-.05-.1-.1-.19-.16-.28,0-.02-.02-.04-.03-.05-.06-.09-.11-.18-.17-.26,0,0,0-.02-.02-.02-.16-.24-.36-.46-.57-.66h0c-.06-.06-.12-.11-.18-.15h-.01c-.06-.05-.12-.09-.18-.13h0c-.34-.22-.75-.29-1.15-.22">
                            </path>
                            <path id="kc" class="nc" d="M173.22,1211.09c.67,1.84,.21,3.71-.33,5.5-.34,1-.62,2.02-.83,3.06-.25,.91-.08,1.89,.47,2.65,.49,.57,1.32,.8,1.58,1.55,.25,.75-.15,1.57-.9,1.83-.75,.21-1.55-.06-2.02-.68-.68-.63-1.18-1.42-1.46-2.3-.71-2.37,.64-4.66,1.66-6.71,.57-1.01,.97-2.11,1.17-3.25,.05-.47,.04-.94-.04-1.4-.08-.44,.54-.71,.71-.24">
                            </path>
                            <path id="kd" class="n" d="M175.47,1176.19c.21-.04,.36-.23,.34-.44,0-.12-.71-11.93,1.05-16.72,.03-.08,.03-.17,0-.26-1.89-6.68-4.51-6.36-5.12-6.16-.57-.08-1.14,.11-1.55,.52-.92,.94-.86,2.94-.79,5.26,.06,1.99,.12,4.24-.5,5.82-.05,.14-.03,.3,.06,.41,2.7,3.35,4.74,7.17,6.03,11.27,.05,.18,.22,.3,.4,.3,.03,0,.05,0,.08,0m-5.23-17.81c-.06-2.04-.11-3.97,.56-4.66,.26-.24,.61-.33,.96-.26,.08,0,.15,0,.23-.03,0,0,2.19-1.01,4.06,5.45-1.24,3.55-1.27,10.31-1.17,14.13-1.28-3.13-3-6.06-5.1-8.72,.59-1.71,.53-3.94,.47-5.92">
                            </path>
                            <path id="ke" class="n" d="M174.29,1208.76c.34-.24,.64-.51,.92-.82,2.2-.97,4.58-1.44,6.98-1.38,3.21,.04,6.38,.71,9.33,1.98,.03,.01,.07,.02,.1,.02,.03,0,.06,0,.1,0h.04c.11,.05,.22,.09,.33,.14,.21,.09,.46-.01,.55-.23,.04-.1,.04-.21,0-.31-1.15-3.05-1.79-6.27-1.89-9.53,.12-2.18,.18-4.3,.18-6.28,0-14.81-3.31-19.32-3.75-19.85-3.76-7.82-4.51-13.21-4.51-13.27,0-.04-.01-.07-.03-.1-.07-.16-.13-.31-.21-.48-.06-.13-.12-.25-.21-.42-.06-.1-.11-.2-.2-.35-.06-.1-.12-.19-.2-.3-.18-.27-.4-.52-.64-.74-.07-.06-.14-.12-.23-.18-.07-.05-.14-.1-.21-.14-.24-.14-.5-.24-.78-.28-.27-.13-.56-.19-.86-.19-.49,0-.97,.18-1.35,.5-.84,.47-1.44,1.27-1.68,2.21-1.29,3.51-1.32,10.4-1.21,14.26-1.31-3.2-3.08-6.2-5.24-8.91-.7-.9-1.46-1.75-2.28-2.54-1.72-1.98-3.09-2.93-4.2-2.93-1.32,0-1.82,1.37-1.9,2.07-.44,2.74,1.72,7.88,1.82,8.1,.01,.03,.03,.06,.06,.09,2.06,2.64,.58,12.58,.43,13.54-4.21,7.42-1.79,15.26-1.67,15.63,1.15,2.81-.18,8.29-.46,9.16-.09,.21,.01,.46,.23,.55,.08,.03,.18,.04,.27,.02,.27-.08,.54-.14,.81-.2,1.81-.48,3.73-.28,5.39,.58,.59,.31,1.15,.69,1.67,1.13,.03,.03,.07,.05,.11,.07,1.48,.53,3.12,.31,4.4-.59m-5.8-1.34c-1.83-.95-3.95-1.19-5.95-.66-.05,.01-.11,.02-.16,.04,.44-1.77,1.39-6.33,.28-9.03-.02-.08-2.42-7.88,1.65-14.99,.02-.04,.04-.09,.05-.14,.08-.45,1.77-11.12-.55-14.22-.22-.53-2.12-5.22-1.74-7.61,0-.01,.16-1.35,1.07-1.35,.57,0,1.65,.46,3.59,2.68,.79,.78,1.54,1.61,2.22,2.49,2.7,3.35,4.74,7.17,6.03,11.27,.07,.22,.3,.35,.52,.28,.19-.06,.31-.24,.3-.43,0-.12-.71-11.93,1.05-16.72,.35-.96,.79-1.57,1.25-1.74,.05-.02,.1-.05,.14-.09,.24-.2,.54-.32,.85-.33,.19,0,.38,.05,.55,.14,.05,.02,.09,.04,.15,.04,.18,.02,.36,.08,.51,.18,.05,.03,.1,.06,.16,.1s.1,.08,.16,.13c.2,.18,.37,.39,.52,.61,.05,.08,.11,.16,.19,.29,.05,.08,.1,.17,.18,.32,.05,.1,.11,.21,.18,.35,.05,.12,.11,.24,.16,.36,.09,.63,.92,5.87,4.61,13.51,.02,.04,.04,.07,.06,.1,.04,.04,3.58,4.23,3.58,19.34,0,1.97-.06,4.07-.18,6.26,.08,3.07,.64,6.12,1.64,9.02-2.97-1.24-6.15-1.89-9.36-1.92-2.56-.08-5.11,.44-7.44,1.52-.04,.02-.08,.05-.12,.09-.24,.28-.52,.53-.83,.75-.66,.47-1.46,.73-2.27,.72-.43,0-.87-.07-1.28-.2-.54-.45-1.13-.85-1.76-1.18">
                            </path>
                            <path id="kf" class="n" d="M184.12,1238.44c.13-.03,.25-.07,.36-.11h0c.7-.21,1.37-.49,2.02-.83,4.67-.12,6.66-3.06,6.77-3.24,2.27-4.87,3.43-9.44,3.46-13.59,.04-5.79-2.13-8.67-2.21-8.76-.3-.45-.58-.93-.86-1.46-.39-.73-.74-1.49-1.04-2.26-.04-.11-.12-.21-.24-.25-.58-.24-1.17-.46-1.77-.67-.05-.02-.1-.02-.16-.02-2.66-.98-5.48-1.49-8.31-1.51-2.55-.07-5.09,.44-7.42,1.5-.04,.02-.08,.06-.12,.09-.24,.28-.52,.54-.83,.75-.66,.48-1.46,.73-2.27,.72-.43,0-.87-.07-1.28-.2-.54-.45-1.13-.85-1.76-1.18-1.83-.95-3.95-1.19-5.95-.66-.29,.06-.58,.13-.86,.21-.13,.03-.23,.12-.28,.25-.57,1.4-1.28,2.77-2.02,4.22-3.27,6.39-6.97,13.63,2.29,23.28,.06,.06,.13,.1,.2,.12,.75,.18,1.51,.27,2.28,.26,2.73,0,5.79-1.04,8.84-3.01,.04-.03,.07-.06,.1-.09,.27-.27,.64-.42,1.02-.41,.78,0,1.73,.53,2.76,1.55,2.04,1.76,4.43,3.06,7.01,3.81,.02,.01,.05,.02,.07,.03,.35,.11,.69,.2,1.03,.28-.23,.08-.47,.17-.75,.26h0l-.3,.09h-.03c-.22,.07-.35,.3-.29,.52,.05,.18,.22,.31,.4,.31,.04,0,.08,0,.11-.02m.08-2.25c-2.48-.72-4.78-1.96-6.75-3.64-1.19-1.18-2.32-1.78-3.34-1.78-.61,0-1.2,.23-1.62,.67-2.9,1.86-5.78,2.84-8.33,2.84-.66,0-1.32-.07-1.96-.21-8.74-9.18-5.34-15.81-2.06-22.24,.69-1.34,1.39-2.72,1.97-4.09,.2-.05,.41-.1,.62-.15,1.81-.48,3.73-.28,5.39,.58,.6,.31,1.15,.69,1.67,1.13,.03,.03,.07,.05,.11,.07,1.48,.53,3.12,.31,4.4-.59,.34-.24,.64-.52,.92-.83,2.19-.96,4.57-1.42,6.96-1.37,2.81,.02,5.59,.54,8.21,1.53,.05,.02,.11,.03,.17,.02,.47,.16,.92,.33,1.37,.52,.3,.75,.64,1.49,1.02,2.2,.29,.55,.58,1.05,.92,1.55,.02,.03,2.09,2.8,2.05,8.27-.03,4.03-1.17,8.49-3.36,13.19-.02,.03-1.86,2.75-6.16,2.81-.02,0-.03,0-.05,0-.69-.1-1.38-.25-2.04-.46-.03-.02-.06-.03-.1-.04">
                            </path>
                            <path id="kg" class="n" d="M181.03,1238.9c.1,0,.21,0,.31-.01h.18c.11-.02,.23-.03,.37-.04,0,0,.08,0,.09,0,.46-.05,.91-.12,1.36-.21,.13-.03,.26-.05,.41-.09,.13-.03,.25-.06,.38-.1,.85-.23,1.68-.55,2.46-.97,.2-.11,.27-.37,.16-.57-.06-.11-.18-.19-.31-.21-.11-.01-.22-.03-.32-.05-.06-.07-.15-.11-.24-.12-4.66-.6-8.38-3.95-8.41-3.97-1.19-1.18-2.32-1.78-3.34-1.78-.61-.01-1.2,.23-1.62,.67-2.9,1.86-5.78,2.84-8.33,2.84-.7,0-1.4-.08-2.08-.24-.22-.05-.45,.08-.5,.31-.03,.14,0,.28,.1,.39l.29,.3c.94,.96,2.63,1.44,5.02,1.44,1.78-.03,3.56-.23,5.3-.61,1.39,1.14,2.99,1.97,4.72,2.46l1.22,.33c.1,.02,.21,.04,.31,.06l.08-.41,.04,.43,.2,.04c.15,.02,.29,.05,.43,.06h.13l.04-.41,.06,.43,1.18,.06h.34Zm-8.74-3.9c-1.74,.39-3.52,.6-5.31,.63-1.17,.04-2.33-.14-3.42-.55,2.86,.16,6.16-.88,9.44-2.99,.04-.03,.07-.06,.1-.09,.27-.27,.64-.42,1.02-.41,.78,0,1.73,.53,2.76,1.55,2.35,2.03,5.17,3.44,8.2,4.09-.39,.15-.79,.29-1.19,.4-.11,.03-.23,.06-.38,.1-.12,.03-.23,.05-.38,.09-.41,.09-.83,.15-1.24,.2h-.12c-.1,.02-.21,.03-.31,.04h-.16c-.09,.02-.19,.02-.28,.02h-.32l-1.31-.08c-.13-.02-.27-.03-.4-.06l-.18-.03-.11-.02c-.1-.02-.19-.03-.29-.05l-1.19-.33c-1.67-.47-3.22-1.3-4.55-2.42-.07-.06-.17-.1-.27-.1-.03,0-.07,0-.1,.01">
                            </path>
                        </g>
                        <g id="IPR_LL3" ${IPRArray.LL3.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="q" class="mk" d="M625.56,1265.52c3.33-6.47,14.06,4.62,14.06,4.62,10.89,6.29,4.86,25.42,2.49,31.77-3.74,5.35-10.64,8.8-22.47-2.67-1.42-7.55-2.72-15.55-2.72-15.55-.93-10.03,8.64-18.17,8.64-18.17">
                            </path>
                            <path id="r" class="mw" d="M642.11,1301.92c-.49,1.31-.83,2.07-.83,2.07-1.59,1.35-2.16,22.09-2.16,22.09,.94,7.32-.95,30.1-.95,30.1,.29,4.77,.12,10.4,.12,10.4-.78,3.01-3.26,1.4-5.51-1.84-6.42-9.27-7.24-20.88-7.24-20.88-1.84-5.82-3.12-32.29-3.12-32.29-.71-1.89-1.78-6.99-2.78-12.33,11.83,11.47,18.73,8.02,22.47,2.67">
                            </path>
                            <path id="s" class="nc" d="M637.08,1271.41s0,.04,.02,.11,.02,.17,.04,.3c.03,.26,.08,.64,.1,1.1s.05,1,.05,1.57-.02,1.19-.06,1.8c-.02,.3-.05,.61-.08,.91s-.08,.59-.11,.87-.09,.55-.13,.81-.09,.5-.15,.72-.09,.43-.14,.6-.09,.33-.12,.46c-.07,.25-.11,.4-.11,.4v.03c-.11,.36,.11,.73,.47,.83,.36,.1,.73-.12,.83-.48,0-.01,0-.03,0-.04,0,0,.03-.16,.09-.43,.03-.14,.06-.31,.1-.5s.07-.41,.1-.65,.08-.49,.1-.77,.07-.56,.09-.86,.05-.61,.06-.92,.03-.63,.02-.95c0-.64-.02-1.27-.05-1.87s-.09-1.15-.16-1.62-.13-.86-.18-1.14c-.03-.14-.05-.25-.07-.32l-.02-.11c-.04-.2-.24-.32-.43-.27-.19,.04-.31,.22-.28,.41v.02Z">
                            </path>
                            <path id="t" class="nc" d="M626.6,1267.88l-.11,.33c-.08,.23-.17,.57-.28,.99s-.23,.94-.35,1.53-.26,1.26-.39,1.99c-.64,3.57-1.08,7.17-1.32,10.79-.06,.99-.11,1.98-.13,2.96-.02,.98-.03,1.94,0,2.88s.06,1.84,.14,2.71c.02,.22,.04,.43,.05,.64s.05,.42,.07,.62c.04,.41,.1,.8,.16,1.18s.13,.74,.19,1.09,.15,.67,.23,.98,.16,.6,.24,.86c.04,.13,.08,.26,.12,.38s.09,.24,.13,.35c.08,.22,.16,.42,.23,.59s.15,.31,.2,.43l.17,.36c.28,.58,.98,.83,1.56,.55s.83-.98,.55-1.56c0-.01-.01-.03-.02-.04l-.05-.09s-.05-.09-.15-.27c-.05-.09-.11-.2-.18-.33s-.13-.29-.21-.47c-.04-.09-.08-.18-.12-.28l-.12-.32c-.08-.23-.18-.47-.25-.74s-.17-.55-.24-.87-.16-.63-.23-.98-.15-.71-.2-1.09c-.03-.19-.06-.38-.1-.58-.03-.2-.06-.4-.08-.6-.11-.81-.19-1.68-.26-2.58s-.11-1.84-.13-2.79-.03-1.93-.02-2.9c.05-3.58,.3-7.15,.75-10.69,.09-.73,.19-1.39,.28-1.98s.19-1.09,.27-1.51,.16-.73,.21-.94l.1-.34h0c.06-.19-.04-.39-.23-.45-.19-.06-.39,.04-.45,.23">
                            </path>
                            <path id="u" class="mk" d="M617.44,1286.64c.46,2.71,1.18,6.94,1.97,11.2-.79-4.26-1.52-8.49-1.97-11.2">
                            </path>
                            <path id="v" class="my" d="M621.89,1301.27c.56,3.24,1.31,6.43,2.25,9.58,0,0,1.29,26.47,3.12,32.29,0,0,.83,11.61,7.25,20.88,1.21,1.74,2.48,3.01,3.52,3.34-.99,1.87-3.2,.28-5.21-2.62-6.42-9.27-7.25-20.88-7.25-20.88-1.83-5.82-3.12-32.29-3.12-32.29-.71-1.89-1.77-6.99-2.78-12.32-.09-.47-.18-.94-.26-1.41l.26,1.41c.76,.74,1.5,1.41,2.22,2.02">
                            </path>
                            <path id="w" class="nc" d="M616.89,1282.3c.01-9.38,8.71-16.78,8.71-16.78,.48-1.09,1.49-1.85,2.67-2-.41,.35-.74,.79-.98,1.27,0,0-9.57,8.15-8.65,18.18,0,0,1.3,8,2.72,15.55,.18,.93,.35,1.85,.53,2.74-.72-.62-1.46-1.29-2.22-2.02-.09-.47-.18-.94-.26-1.41-.79-4.26-1.51-8.49-1.97-11.2h0c-.3-1.81-.49-2.94-.49-2.94-.04-.47-.06-.93-.06-1.39">
                            </path>
                            <path id="x" class="n" d="M633.67,1307.41h0c3.45,0,6.41-1.73,8.79-5.16,.02-.03,.04-.06,.05-.09,2.21-5.92,8.56-25.72-2.62-32.25-.61-.62-6.7-6.74-11.14-6.74-1.5-.04-2.88,.82-3.51,2.18-.9,.79-9.64,8.67-8.73,18.48,.02,.11,1.32,8.12,2.73,15.59,.02,.09,.06,.16,.12,.23,5.31,5.15,10.13,7.77,14.31,7.77m8.08-5.59c-2.22,3.16-4.93,4.75-8.08,4.75-3.93,0-8.51-2.5-13.63-7.44-1.39-7.42-2.68-15.33-2.69-15.41-.89-9.66,8.41-17.71,8.5-17.79,.04-.04,.08-.08,.1-.13,.48-1.12,1.59-1.83,2.81-1.8,4.22,0,10.51,6.46,10.58,6.52,.03,.03,.06,.05,.09,.07,10.65,6.15,4.5,25.38,2.32,31.21">
                            </path>
                            <path id="y" class="n" d="M636.84,1368.69c.63,0,1.46-.33,1.87-1.91,0-.03,.01-.06,.01-.09,0-.06,.17-5.7-.12-10.44,.08-.87,1.88-22.86,.95-30.13,.28-10.04,1.11-20.94,2.01-21.72,.05-.04,.09-.09,.11-.15,.01-.03,.34-.79,.83-2.1,.08-.22-.03-.46-.24-.54-.18-.07-.38,0-.49,.15-5,7.17-12.56,6.25-21.83-2.73-.13-.12-.33-.15-.49-.07-.16,.09-.25,.27-.21,.45,1.22,6.5,2.16,10.65,2.78,12.34,.09,1.77,1.33,26.48,3.12,32.29,.07,.85,1.12,12.09,7.31,21.04,.94,1.35,2.75,3.61,4.38,3.61m1.05-2.07c-.22,.82-.57,1.23-1.05,1.23-.89,0-2.3-1.25-3.69-3.25-6.28-9.06-7.16-20.55-7.17-20.67,0-.03,0-.07-.02-.1-1.8-5.7-3.09-31.92-3.1-32.19,0-.04-.01-.09-.03-.13-.56-1.49-1.41-5.19-2.52-10.99,4.94,4.56,9.43,6.87,13.36,6.87,2.63,0,5.15-1.08,6.97-2.98-1.35,3.54-1.83,18.53-1.92,21.73,.92,7.25-.93,29.85-.95,30.08,.27,4.52,.14,9.82,.12,10.37">
                            </path>
                        </g>
                        <g id="IPR_LL4" ${IPRArray.LL4.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="a" class="mw" d="M682.24,1296.44c-.22,.42-.35,.66-.35,.66-.18,26.26-4.87,54.65-4.87,54.65-1.24,4.97-2.87,4.59-3.5,6.6-1.52,4.91-5.22-.05-5.22-.05-6.3-6.5-8.27-61.21-8.27-61.21-.28-.36-.51-.77-.67-1.2,7.54,7.15,17.11,4.45,22.87,.54">
                            </path>
                            <path id="aa" class="mk" d="M660.24,1269.93c10.43-12.79,17.91-2.56,17.91-2.56,2.76,3.15,6.3,7.09,6.3,7.09,6.81,3.67-.48,18.66-2.21,21.98-5.76,3.91-15.33,6.6-22.86-.54-1.61-3.73-4.25-14.15-4.25-14.15-1.57-4.53,5.12-11.81,5.12-11.81">
                            </path>
                            <path id="ab" class="mx" d="M660.23,1269.9c1.61-2.1,3.62-3.87,5.91-5.2h0c-2.28,1.34-4.28,3.1-5.88,5.19,0,0-6.69,7.28-5.12,11.81,0,0,2.64,10.43,4.25,14.15,.91,.87,1.92,1.64,3,2.29,.48,10.89,2.68,52.99,8.16,58.64,0,0,1.35,1.81,2.75,2.16-1.64,3.83-4.98-.67-4.98-.67-6.3-6.49-8.27-61.21-8.27-61.21-.29-.36-.51-.77-.67-1.2-1.61-3.73-4.25-14.15-4.25-14.15-1.57-4.53,5.12-11.81,5.12-11.81">
                            </path>
                            <path id="ac" class="nc" d="M655.12,1281.71c-1.58-4.53,5.12-11.81,5.12-11.81,1.61-2.09,3.6-3.86,5.88-5.18-1.35,1.1-2.58,2.34-3.66,3.7,0,0-6.69,7.29-5.12,11.81,0,0,2.65,10.43,4.25,14.16,.16,.43,.38,.84,.67,1.2,0,0,.03,.94,.11,2.57-1.08-.65-2.09-1.42-3-2.29-1.61-3.72-4.25-14.15-4.25-14.15">
                            </path>
                            <path id="ad" class="nc" d="M680.14,1292.26s-.19,.2-.54,.56c-.17,.18-.38,.41-.62,.66-.23,.25-.49,.54-.78,.83s-.6,.6-.94,.9c-.18,.14-.36,.29-.54,.44-.19,.14-.4,.26-.6,.4s-.44,.23-.66,.35-.47,.19-.72,.3c-.25,.1-.5,.18-.76,.24l-.39,.11-.4,.07c-.27,.04-.54,.11-.81,.13l-.82,.08c-.54,.05-1.08,.03-1.6,.05-.53,0-1.03-.04-1.51-.05s-.93-.08-1.35-.11-.81-.07-1.14-.12-.64-.08-.88-.12l-.77-.1,.75,.17c.24,.05,.53,.12,.87,.2s.72,.15,1.13,.23,.87,.17,1.35,.24,.99,.14,1.52,.2c.53,.03,1.08,.1,1.65,.1h.86c.29,0,.58-.04,.87-.06l.44-.04,.43-.08c.29-.04,.58-.1,.86-.18,.28-.09,.57-.15,.83-.26s.54-.21,.79-.33,.5-.26,.73-.4l.66-.43c.41-.31,.79-.6,1.12-.89s.62-.55,.88-.77l.65-.58c.38-.32,.58-.51,.58-.51h0c.35-.31,.39-.84,.09-1.19-.31-.35-.84-.39-1.19-.09h0s-.04,.04-.06,.06">
                            </path>
                            <path id="ae" class="n" d="M671.5,1361.04c1.09,0,1.91-.83,2.42-2.47,.2-.58,.53-1.1,.98-1.52,.77-.85,1.73-1.91,2.53-5.11,.05-.32,4.69-28.68,4.88-54.65,.06-.11,.16-.3,.3-.57l.76-1.47-1.37,.93c-3.44,2.39-7.49,3.72-11.68,3.84-3.99,.02-7.82-1.54-10.66-4.34l-1.48-1.4,.81,1.88c.17,.42,.38,.82,.64,1.2,.14,3.78,2.14,54.91,8.38,61.34,.04,.06,1.76,2.34,3.5,2.34m9.96-63.51c-.22,25.83-4.81,53.97-4.86,54.25-.74,2.96-1.62,3.93-2.33,4.71-.53,.51-.92,1.14-1.15,1.83-.39,1.25-.93,1.88-1.62,1.88-1.1,0-2.44-1.48-2.86-2.05-5.91-6.09-8-56.21-8.17-60.67,2.8,2.22,6.28,3.41,9.85,3.38,3.95-.09,7.8-1.24,11.14-3.34">
                            </path>
                            <path id="af" class="n" d="M670.31,1300.87h0c4.35-.12,8.57-1.5,12.15-3.98l.09-.06,.05-.09c2.24-4.32,9.01-18.67,2.1-22.5-.43-.48-3.7-4.12-6.25-7.03-.1-.14-2.99-4.02-7.76-4.02-3.6,0-7.23,2.22-10.79,6.59-.26,.29-6.83,7.5-5.19,12.21,.1,.39,2.66,10.47,4.26,14.18l.1,.14c2.99,2.95,7.04,4.59,11.24,4.57m11.59-4.62c-3.42,2.35-7.44,3.67-11.59,3.78-3.96,.02-7.77-1.52-10.6-4.28-1.58-3.72-4.17-13.91-4.2-14.01-1.49-4.28,4.95-11.35,5.02-11.42,3.41-4.19,6.83-6.3,10.16-6.3,4.35,0,7.08,3.67,7.1,3.7,2.75,3.15,6.29,7.08,6.33,7.12l.11,.09c6.44,3.47-.7,18.15-2.33,21.32">
                            </path>
                        </g>
                        <g id="IPR_LL5" ${IPRArray.LL5.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="ag" class="mw" d="M722.84,1290.72c-.8,1.76-1.7,3.47-2.7,5.13,.38,1.58-1.88,14.83-1.88,14.83-1.1,4.34-2.71,10.45-2.71,10.45-.71,3.61-3.49,13.4-3.49,13.4-2.04,6.45-1.4,16.37-1.4,16.37-.3,5.6-5.59,1.92-5.59,1.92-5.68-3.98-4.29-39.95-4.29-39.95-.59-2.97-.85-15.79-.85-15.79-.29-.71-.54-1.44-.75-2.18,10.65,11.61,18.66,3.5,23.65-4.21">
                            </path>
                            <path id="ah" class="mk" d="M705.87,1265.71c4.28-4.74,8.48-.38,8.48-.38,1.74,.99,7.82,7.17,7.82,7.17,6.29,3.15,3.37,12.36,.67,18.23-5,7.7-13,15.82-23.65,4.21-1.53-5.28-3.33-15.64-3.33-15.64-1.7-5.87,9.35-12.85,10.01-13.58">
                            </path>
                            <path id="ai" class="nc" d="M716.73,1293.88l-1.47,.96c-.22,.14-.46,.28-.71,.44-.26,.14-.52,.3-.81,.43-.14,.07-.29,.14-.43,.2-.15,.06-.29,.13-.45,.18s-.31,.1-.46,.14l-.47,.1c-.31,.05-.63,.08-.95,.08h-.23c-.08,0-.16,0-.23-.01l-.45-.04c-.15-.03-.3-.06-.44-.08-.08-.01-.14-.03-.21-.04s-.14-.04-.21-.06c-.27-.08-.53-.13-.76-.23s-.45-.17-.63-.23l-.48-.22-.42-.19-.07-.03c-.57-.27-1.25-.12-1.65,.37-.27,.4-.16,.95,.24,1.22,.07,.05,.14,.08,.22,.11,.05,.02,.09,.04,.14,.05l.53,.17,.6,.19,.82,.2c.29,.08,.64,.12,.99,.19,.09,.01,.18,.03,.27,.04l.29,.02,.59,.04c.2,0,.41,0,.63,0,.11,0,.21,0,.32-.01s.21-.03,.32-.04c.43-.05,.85-.13,1.27-.25,.2-.07,.4-.14,.6-.2s.37-.16,.55-.24,.34-.18,.51-.27c.16-.09,.32-.18,.47-.28,.3-.19,.56-.39,.81-.57,.24-.19,.47-.37,.66-.53l1.31-1.1h0c.13-.1,.16-.28,.06-.41-.02-.03-.04-.05-.07-.07-.17-.12-.38-.12-.56-.02">
                            </path>
                            <path id="aj" class="mx" d="M705.86,1265.71c.36-.4,.76-.77,1.19-1.09-.43,.32-.83,.69-1.18,1.09-.66,.73-11.72,7.71-10.01,13.58,0,0,1.8,10.37,3.33,15.65,.94,1.04,1.97,2,3.07,2.87,.09,3.58,.35,11.8,.81,14.11,0,0-1.4,35.96,4.29,39.95,.84,.57,1.79,.96,2.78,1.15-1.41,2.37-5.06-.17-5.06-.17-5.68-3.98-4.29-39.95-4.29-39.95-.59-2.97-.85-15.78-.85-15.78-1.61-3.62-4.07-17.82-4.07-17.82-1.7-5.87,9.35-12.85,10.01-13.58">
                            </path>
                            <path id="ak" class="nc" d="M699.18,1294.94c-1.53-5.28-3.33-15.65-3.33-15.65-1.7-5.87,9.35-12.85,10.01-13.58,.36-.4,.75-.77,1.18-1.09l.02-.02c.12-.09,.24-.17,.36-.25,.02,0,.03-.02,.05-.03,.12-.08,.23-.14,.35-.2,.02,0,.04-.02,.06-.03,.11-.06,.23-.12,.34-.17,0,0,.01,0,.02,0,.33-.14,.67-.25,1.02-.31,.04,0,.08-.02,.11-.02,.02,0,.03,0,.05,0-.47,.34-.9,.73-1.29,1.16-.66,.74-11.72,7.71-10.01,13.58,0,0,2.46,14.19,4.07,17.82,0,0,.01,.65,.04,1.68-1.1-.87-2.12-1.83-3.07-2.87">
                            </path>
                            <path id="al" class="n" d="M708.32,1354.86c1.18,0,2.62-.61,2.78-3.51,0-.15-.61-9.97,1.38-16.27,.03-.11,2.81-9.87,3.51-13.45h0s1.61-6.1,2.71-10.43c.23-1.35,2.14-12.66,1.91-14.85,.97-1.63,1.85-3.32,2.64-5.04,.09-.21,0-.46-.21-.55-.19-.08-.41-.02-.52,.15-4.29,6.61-8.48,9.83-12.83,9.83-3.29,0-6.71-1.91-10.17-5.68-.16-.17-.42-.18-.59-.02-.12,.11-.16,.27-.12,.42,.2,.73,.44,1.45,.73,2.15,.03,1.2,.28,12.77,.85,15.73-.08,2.06-1.28,36.23,4.47,40.26,1.03,.71,2.23,1.15,3.48,1.26m11.71-59.18c-.14,.24-.22,.37-.23,.38-.06,.09-.08,.21-.05,.32,.26,1.1-.98,9.37-1.89,14.67-1.09,4.31-2.71,10.42-2.71,10.42-.7,3.57-3.47,13.3-3.49,13.4-2.03,6.44-1.44,16.11-1.41,16.51-.15,2.66-1.5,2.66-1.94,2.66-1.08-.12-2.11-.5-3-1.11-4.35-3.05-4.59-27.23-4.11-39.59,0-.03,0-.07,0-.1-.57-2.9-.84-15.59-.84-15.71,0-.06-.01-.11-.04-.16-.06-.13-.11-.27-.17-.42,3.2,3.09,6.4,4.65,9.52,4.65,3.54,0,6.95-1.94,10.35-5.9">
                            </path>
                            <path id="am" class="n" d="M709.68,1301.58h0c4.65,0,9.07-3.34,13.53-10.21,4.43-9.64,4.14-16.29-.77-18.8-.61-.62-6.05-6.11-7.81-7.16-1.19-1.16-2.76-1.84-4.42-1.92-1.81,.07-3.5,.93-4.62,2.35-.08,.08-.5,.4-.9,.7-2.93,2.2-10.73,8.03-9.2,13.28,0,.06,1.81,10.41,3.33,15.64,.02,.06,.05,.12,.09,.17,3.62,3.95,7.25,5.95,10.79,5.95m.52-37.25c1.45,.09,2.82,.69,3.86,1.7,.03,.03,.06,.05,.09,.08,1.67,.95,7.67,7.03,7.73,7.1,.03,.03,.07,.06,.11,.08,6.09,3.04,2.91,12.38,.48,17.68-4.26,6.56-8.45,9.77-12.8,9.78-3.27,0-6.67-1.89-10.1-5.6-1.5-5.22-3.27-15.4-3.29-15.5-1.37-4.73,6.35-10.52,8.89-12.42,.36-.25,.7-.52,1.02-.81,.97-1.24,2.43-1.99,4-2.07">
                            </path>
                        </g>
                        <g id="IPR_LL2" ${IPRArray.LL2.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="j" class="mw" d="M584.17,1292.29c2.7,5.75,4.24,5.78,4.24,5.78,5.65,1.45,8.89-5.12,10.83-10.44-.29,1.4-.5,2.23-.5,2.23-.16,.67-1.93,11.8-1.93,11.8,0,4.35-2.76,20.03-2.76,20.03-.18,3.7-2.26,17.8-2.26,17.8-1.27,6.4-1.91,8.75-1.91,8.75-6.46,4.23-5.58-23.14-5.58-23.14-.24-2.58,0-15.04,0-15.04-.29-2.21-.18-13.93-.13-17.76">
                            </path>
                            <path id="k" class="mk" d="M588.41,1298.07s-1.55-.03-4.24-5.78c0-.76,.02-1.21,.02-1.21-1.18-3.35-1.89-25.3-1.89-25.3,.33-3.55,8.35-1.91,8.35-1.91,11.04-.11,10.46,3.09,10.46,3.09,.69,7.1-.99,16.45-1.87,20.66-1.94,5.32-5.18,11.9-10.83,10.44">
                            </path>
                            <path id="l" class="nc" d="M596.28,1264.78l-.3,1.65c-.18,.99-.4,2.32-.56,3.66-.04,.34-.08,.67-.11,1s-.06,.66-.08,.98-.03,.63-.04,.92c0,.3,0,.58,0,.84s.01,.5,.04,.72,.04,.4,.07,.56c.06,.32,.09,.5,.09,.5,.06,.33,.38,.55,.71,.49,.33-.06,.55-.38,.49-.71h0s0-.02,0-.03v-.06s-.05-.15-.11-.4c-.03-.13-.05-.3-.08-.48s-.05-.41-.08-.65-.03-.5-.05-.78c0-.28-.02-.57-.01-.88s0-.63,.02-.95,.03-.66,.05-.99c.08-1.32,.23-2.65,.34-3.64s.2-1.66,.2-1.66c.02-.16-.1-.3-.26-.32-.15-.02-.29,.08-.32,.23">
                            </path>
                            <path id="m" class="nc" d="M589.58,1264.55l-.02,.54c0,.17-.01,.38-.01,.62s0,.52,0,.81,.01,.61,.03,.95,.03,.69,.06,1.06c.04,.73,.11,1.51,.16,2.29s.1,1.54,.13,2.26c0,.36,.02,.7,0,1.02,0,.33-.02,.62-.03,.9-.03,.27-.05,.53-.08,.74s-.06,.4-.1,.55c-.08,.29-.12,.46-.12,.46l-.02,.06c-.11,.41,.14,.83,.55,.93s.83-.14,.93-.55c0-.02,0-.04,.01-.05,0,0,.04-.21,.11-.59,.03-.18,.04-.41,.08-.66s.02-.54,.03-.85c-.01-.3,0-.64-.04-.98s-.05-.7-.09-1.08c-.08-.74-.19-1.52-.31-2.29s-.23-1.54-.33-2.26c-.05-.36-.1-.71-.14-1.04s-.07-.64-.1-.93-.05-.55-.07-.78-.03-.44-.04-.61c-.01-.34-.02-.54-.02-.54,0-.16-.14-.28-.3-.28h0c-.15,0-.27,.13-.28,.28">
                            </path>
                            <path id="n" class="n" d="M588.48,1348.79h0c.54-.02,1.07-.2,1.51-.51,.09-.06,.15-.14,.17-.24,0-.02,.66-2.44,1.91-8.78,.09-.6,2.1-14.18,2.27-17.86,.11-.59,2.76-15.72,2.76-20.05,.61-3.78,1.8-11.18,1.92-11.7,0,0,.21-.84,.5-2.24,.05-.22-.08-.43-.29-.49-.21-.06-.43,.05-.51,.26-2.89,7.94-6.24,11.23-10.33,10.18-.03,0-.06-.01-.1-.01,.02,0-1.42-.31-3.88-5.54-.1-.21-.35-.3-.56-.2-.15,.07-.24,.21-.24,.37-.06,4.63-.15,15.64,.14,17.82-.01,.45-.24,12.44,0,15.02-.03,.74-.58,19.41,3.1,23.22,.41,.47,.99,.74,1.61,.75m.92-1.13c-.59,.47-1.45,.38-1.93-.2-3.44-3.56-2.88-22.47-2.87-22.66-.23-2.58,0-14.92,0-15.04-.26-1.96-.2-11.3-.15-16.03,2.07,3.93,3.39,4.4,3.77,4.45,.53,.14,1.08,.21,1.63,.21,3.73,0,6.27-3.35,8.03-6.99-.55,3.28-1.54,9.53-1.6,9.88,0,4.33-2.73,19.87-2.76,20.03-.18,3.69-2.25,17.67-2.27,17.81-1.07,5.39-1.69,7.92-1.85,8.55">
                            </path>
                            <path id="o" class="n" d="M589.86,1298.39h0c5.09,0,7.95-6.24,9.66-10.92,1.01-4.81,2.57-13.82,1.9-20.81,0-.46-.16-.91-.48-1.25-.86-1.03-3.27-2.26-9.85-2.26h-.51c-1.27-.24-2.56-.36-3.86-.38-3.89,0-4.84,1.45-4.95,2.67,.03,.94,.71,21.81,1.88,25.4l-.02,1.14c0,.06,.01,.13,.04,.18,2.52,5.37,4.13,5.96,4.55,6.02,.53,.14,1.08,.21,1.63,.21m1.24-34.4c6.47,0,8.52,1.2,9.16,1.91,.2,.18,.32,.44,.33,.7,0,.03,0,.07,0,.1,.7,7.14-1.07,16.74-1.87,20.54-2.53,6.92-5.43,10.32-8.86,10.32h0c-.49,0-.98-.07-1.45-.19-.03,0-.06-.01-.1-.01,.02,0-1.4-.3-3.83-5.45l.02-1.12s0-.1-.02-.14c-1.14-3.25-1.85-24.95-1.86-25.17,.15-1.53,2.32-1.86,4.12-1.86,1.25,.01,2.5,.14,3.73,.37,.03,.01,.06,.01,.09,0h.54Z">
                            </path>
                        </g>
                        <g id="IPR_LL1" ${IPRArray.LL1.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="b" class="mw" d="M559.32,1292.6h0v-.03c-.04,1.53-.24,8.39-.38,11.91,0,0-.61,21-1.53,23.97,0,0-1.87,18.06-2.87,20.08,0,0-2.82,7.79-5.31,0,0,0-4.37-18.87-2.81-25.06,0,0-.24-14.86-.64-16.19,0,0-.7-11.65-1.18-16.18h0c6.03,11.56,11.32,8.8,14.71,1.51">
                            </path>
                            <path id="c" class="mk" d="M543.81,1286.12c-.61-3.69-1.11-7.41-1.58-11.12-.25-1.95-.48-3.9-.63-5.86-.08-.78-.1-1.56-.06-2.35-.06-.56,.08-1.12,.41-1.58,.56-.55,1.26-.94,2.03-1.12,1.46-.38,2.96-.58,4.46-.58,3.39-.04,6.79,.19,10.14,.69,.52,.07,1.03,.14,1.55,.21,.21,0,.42-.04,.64-.03,.74-.06,1.43,.42,1.62,1.15,.02,.49-.02,.97-.12,1.45,0,.31-.02,.63-.03,.94-.11,3.39-.3,6.78-.59,10.16-.26,4.06-.83,8.09-1.72,12.06-.1,.43-.22,.86-.34,1.28-.14,.34-.24,.7-.3,1.06-.03,.29-.13,.57-.29,.81-.15,.31-.31,.61-.48,.92-.56,1.04-1.25,2.02-2.05,2.89-1.28,1.35-3.03,2.3-4.93,1.77-1.06-.34-2.02-.93-2.81-1.72-1.16-1.15-2.17-2.45-2.99-3.86-.21-.35-.42-.7-.62-1.06-.26-.35-.45-.75-.57-1.17-.05-.48-.12-.96-.2-1.44-.19-1.16-.37-2.33-.55-3.49">
                            </path>
                            <path id="d" class="nc" d="M556.56,1265.2c-.09,1.85-.39,3.68-.91,5.46-.24,.56-.44,1.14-.58,1.73-.04,.56,.38,1.05,.94,1.08,.19,.01,.39-.03,.56-.12,.54-.31,.55-.99,.65-1.54,.16-.98,.24-1.96,.26-2.95,.02-.93-.02-1.87-.1-2.8,0-.31-.04-.62-.1-.92-.03-.2-.22-.33-.42-.29-.17,.03-.29,.17-.3,.34">
                            </path>
                            <path id="e" class="nc" d="M547.15,1264.22c-.58,3.73-.8,7.51-.67,11.28-.04,.56,.38,1.04,.94,1.08,.56,.04,1.04-.38,1.08-.94,0-.12,0-.25-.04-.37-.29-1.83-.49-3.67-.57-5.52-.05-1.28-.07-2.56-.05-3.84,0-.53,.02-1.05,.04-1.58,.02-.45-.65-.59-.72-.11">
                            </path>
                            <path id="f" class="mx" d="M541.6,1269.16c.15,1.96,.38,3.91,.63,5.86,.47,3.71,.97,7.43,1.58,11.12,.18,1.16,.36,2.33,.55,3.49,.08,.48,.14,.96,.2,1.45,.12,.42,.31,.82,.57,1.17,.2,.36,.41,.71,.62,1.05,.29,.48,.6,.96,.93,1.42,.4,5.2,.8,11.85,.8,11.85,.4,1.32,.64,16.19,.64,16.19-1.57,6.19,2.81,25.06,2.81,25.06,.71,2.22,1.44,3.17,2.13,3.4-1.04,1.19-2.48,1.52-3.82-2.68,0,0-4.37-18.87-2.81-25.06,0,0-.24-14.86-.64-16.19,0,0-.68-11.25-1.16-15.93-.04-.09-.06-.19-.08-.28-.05-.48-.12-.97-.2-1.44-.19-1.16-.37-2.33-.55-3.49-.61-3.69-1.11-7.41-1.58-11.12-.25-1.95-.48-3.9-.63-5.86-.04-.58-.09-1.18-.09-1.77,0,.59,.05,1.18,.09,1.76">
                            </path>
                            <path id="g" class="nc" d="M545.13,1292.24c-.26-.35-.46-.75-.57-1.17-.05-.48-.12-.97-.2-1.45-.19-1.16-.37-2.33-.55-3.49-.61-3.69-1.11-7.41-1.58-11.12-.25-1.95-.48-3.9-.63-5.86-.04-.58-.09-1.17-.09-1.76,0-.2,0-.39,.02-.58-.06-.56,.08-1.12,.41-1.58,.56-.55,1.26-.94,2.03-1.12,.05-.02,.1-.02,.15-.04-.18,.12-.35,.27-.49,.43-.32,.46-.47,1.02-.41,1.58-.04,.78-.02,1.57,.06,2.35,.15,1.96,.38,3.91,.63,5.86,.47,3.71,.97,7.43,1.58,11.12,.18,1.16,.36,2.33,.55,3.49,.08,.48,.14,.96,.2,1.44,.01,.1,.04,.19,.08,.29,.11,1.08,.23,2.52,.35,4.08-.32-.47-.63-.94-.93-1.42-.21-.35-.42-.7-.62-1.06">
                            </path>
                            <path id="h" class="n" d="M551.72,1352.51c1.81,0,3.08-3.36,3.22-3.74,1-2.02,2.82-19.44,2.9-20.18,.91-2.92,1.5-23.14,1.53-24,.13-3.43,.32-9.98,.38-11.91,0-.23-.17-.42-.4-.43-.21-.02-.4,.13-.44,.34-1.29,2.76-3.41,6.02-6.2,6.02-2.46,0-5.13-2.63-7.72-7.61-.11-.2-.36-.28-.57-.18-.15,.08-.24,.24-.22,.41,.47,4.46,1.17,16.04,1.18,16.16,0,.03,0,.07,.02,.1,.28,.93,.53,10.07,.62,16.02-1.54,6.27,2.64,24.43,2.82,25.2,.82,2.56,1.76,3.79,2.89,3.79m7.13-57.97c-.08,2.8-.22,7.35-.32,10.02,0,.21-.62,20.98-1.51,23.86-.54,5.08-2.06,18.41-2.85,20.01-.47,1.28-1.52,3.23-2.45,3.23-.4,0-1.2-.41-2.08-3.17-.03-.16-4.32-18.81-2.8-24.83,0-.04,.01-.07,.01-.11-.02-1.51-.25-14.64-.65-16.25-.04-.68-.56-9.11-.99-14.16,2.48,4.18,4.99,6.3,7.49,6.3,2.22,0,4.33-1.69,6.14-4.91">
                            </path>
                            <path id="i" class="n" d="M552.62,1299.53h0c1.61-.09,3.11-.83,4.15-2.05,.83-.9,1.53-1.9,2.11-2.97,.17-.31,.33-.62,.49-.94l.06-.12c.16-.26,.25-.56,.28-.87,.02-.2,.08-.4,.16-.59,.05-.12,.09-.24,.13-.36,.13-.43,.24-.87,.35-1.3,.89-3.99,1.47-8.04,1.73-12.12,.28-3.29,.47-6.72,.59-10.18l.03-.94c0-.17,.03-.33,.07-.5,.08-.34,.1-.7,.05-1.04-.22-.92-1.07-1.55-2.01-1.48-.14,0-.27,0-.41,.02-.08,0-.17,.01-.25,.01-.46-.07-.98-.14-1.49-.21-3.38-.5-6.79-.73-10.21-.69-1.54,0-3.08,.21-4.57,.6-.84,.2-1.62,.63-2.23,1.24-.35,.43-.52,.97-.49,1.52,0,.1,0,.2-.02,.31-.04,.76-.02,1.52,.05,2.27v.14c.16,2.03,.41,4.1,.64,5.88,.42,3.32,.94,7.24,1.58,11.14l.18,1.17c.12,.77,.24,1.55,.37,2.32,.08,.47,.14,.95,.19,1.42,.07,.39,.24,.75,.47,1.07,.06,.09,.11,.18,.16,.26,.2,.36,.41,.72,.62,1.07,.84,1.45,1.87,2.78,3.06,3.95,.83,.84,1.85,1.47,2.98,1.82,.39,.11,.79,.16,1.19,.16m8.09-34.64c.45,.02,1.14,.15,1.27,.81,.03,.24,.02,.49-.05,.73-.04,.21-.07,.42-.08,.63l-.03,.94c-.11,3.45-.31,6.86-.59,10.14-.26,4.04-.83,8.05-1.71,11.99-.1,.42-.21,.85-.34,1.26-.03,.1-.07,.2-.11,.31-.12,.27-.19,.56-.21,.86-.02,.18-.08,.36-.18,.51l-.07,.13c-.15,.3-.31,.6-.47,.9-.54,1.01-1.21,1.96-1.99,2.8-.89,1.05-2.17,1.69-3.54,1.79h0c-.33,0-.65-.04-.96-.13-1-.32-1.9-.88-2.63-1.62-1.14-1.12-2.12-2.39-2.92-3.77-.21-.34-.41-.69-.61-1.04-.05-.09-.11-.19-.18-.29-.16-.21-.28-.46-.35-.72-.05-.49-.12-.98-.2-1.47-.13-.77-.25-1.54-.37-2.32l-.18-1.17c-.65-3.9-1.16-7.8-1.58-11.11-.23-1.77-.48-3.82-.63-5.84v-.14c-.08-.71-.1-1.43-.06-2.14,0-.12,.02-.23,.02-.34-.04-.36,.07-.72,.29-1.01,.51-.49,1.15-.83,1.84-.99,1.42-.37,2.89-.56,4.36-.56,3.37-.03,6.74,.19,10.07,.68,.51,.07,1.03,.14,1.54,.21,.13,0,.26,0,.38-.02,.08,0,.17-.02,.25-.02">
                            </path>
                        </g>
                        <g id="IPR_LL8" ${IPRArray.LL8.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="an" class="mw" d="M863.13,1293.95c8.04-2.59,11.05-.19,11.05-.19,2.23,1.16,7.22-.4,12.1-3.09-.28,.75-.47,1.18-.47,1.18,1.88,5.23-.75,15.41-.75,15.41-.62,2.56-.85,5.2-.66,7.82,1.41,3.77,1.98,11.6,1.98,11.6,1.13,5.75-.57,7.35-.57,7.35-.75,2.92-3.96-.47-3.96-.47,.75,3.39-3.58,1.7-3.58,1.7-2.17-1.04-15.65-13.39-15.65-13.39-6.69-4.52-9.43-24.89-9.43-24.89-.08-1.23-.24-2.46-.47-3.67,6.48,1.97,10.41,.64,10.41,.64">
                            </path>
                            <path id="ao" class="mk" d="M849.32,1276.9c-.23-1.89,.13-3.81,1.05-5.49,10.29-9.36,16.21-3.78,16.21-3.78,4.66,4.37,5.48,1.86,5.48,1.86,1.5-2.32,5.89-2.03,10.47-.93,.68,.52,1.1,.89,1.1,.89,7.8,5.28,4.07,17.38,2.64,21.21-4.88,2.69-9.87,4.25-12.1,3.09,0,0-3.01-2.4-11.05,.19,0,0-3.94,1.33-10.41-.64-.42-2.28-.95-4.15-.95-4.15-2.45-4.9-2.45-12.25-2.45-12.25">
                            </path>
                            <path id="ap" class="my" d="M854.87,1296.5s2.73,20.36,9.43,24.89c0,0,13.48,12.35,15.65,13.39,.55,.21,1.13,.34,1.71,.41-.85,1.07-3.4,.08-3.4,.08-2.17-1.04-15.65-13.39-15.65-13.39-6.69-4.52-9.43-24.89-9.43-24.89-.08-1.21-.23-2.42-.46-3.61,.64,.19,1.26,.36,1.85,.49,.14,.88,.25,1.79,.29,2.64">
                            </path>
                            <path id="aq" class="mk" d="M849.23,1275.53c-.02,.46,.01,.92,.09,1.37,0,0,0,7.35,2.45,12.26,0,0,.54,1.91,.96,4.21h0c-.42-2.28-.95-4.16-.95-4.16-2.45-4.9-2.45-12.25-2.45-12.25-.08-.47-.11-.94-.09-1.42">
                            </path>
                            <path id="ar" class="nc" d="M849.32,1276.9c-.08-.45-.11-.91-.09-1.37,.1-1.42,.49-2.8,1.15-4.06,.81-.74,1.66-1.43,2.54-2.08-1.28,2.07-2.34,4.64-1.91,7.03,0,0,0,7.35,2.45,12.25,.47,1.71,.84,3.44,1.12,5.18-.59-.13-1.21-.3-1.85-.49-.42-2.3-.96-4.21-.96-4.21-2.45-4.9-2.45-12.25-2.45-12.25">
                            </path>
                            <path id="as" class="nb" d="M872.07,1269.5s-.82,2.51-5.48-1.86c0,0-5.91-5.59-16.21,3.78,1.08-2.11,2.48-4.04,4.13-5.73,4.81-5.56,13.76,1.23,13.76,1.23,1.22,1.41,3.21-.76,3.21-.76,3.07-3.07,8.7,.61,11.06,2.41-4.58-1.11-8.97-1.39-10.47,.93">
                            </path>
                            <path id="at" class="nc" d="M866.04,1289.1l-.48,.28c-.15,.09-.34,.21-.55,.34s-.44,.28-.7,.42-.53,.3-.83,.45c-.15,.07-.31,.13-.47,.2-.16,.06-.33,.11-.5,.17s-.36,.08-.54,.13-.38,.05-.57,.08c-.2,.02-.4,.03-.6,.03h-.61c-.21-.03-.41-.03-.62-.05l-.61-.08c-.41-.05-.81-.15-1.2-.23-.39-.09-.76-.19-1.11-.28s-.68-.2-.99-.29-.59-.18-.83-.27l-.64-.22c-.35-.12-.55-.19-.55-.19l.53,.24,.61,.27c.24,.11,.51,.22,.81,.34,.3,.12,.62,.26,.97,.38s.71,.25,1.1,.38c.39,.11,.79,.25,1.21,.34,.21,.05,.42,.1,.63,.14s.43,.07,.65,.1l.33,.05,.33,.02c.22,.02,.44,.03,.66,.02,.22-.01,.44,0,.66-.03s.43-.05,.64-.09,.41-.09,.6-.14l.56-.18c.35-.14,.67-.27,.96-.41s.54-.26,.76-.37l.57-.28,.51-.24h0c.27-.12,.39-.43,.28-.7-.01-.03-.02-.05-.04-.08-.19-.29-.56-.39-.87-.25-.02,.01-.03,.02-.05,.03">
                            </path>
                            <path id="au" class="nc" d="M871.05,1272.23s.22,.73,.55,1.81c.08,.27,.16,.56,.25,.87s.17,.64,.24,.99c.04,.17,.08,.35,.1,.53s.07,.36,.08,.55,.04,.38,.06,.56l.03,.57c0,.38,0,.76-.04,1.14l-.02,.28c0,.09-.03,.18-.04,.28-.03,.18-.05,.36-.08,.54-.04,.18-.07,.35-.11,.52-.02,.08-.03,.17-.05,.25s-.04,.16-.06,.24c-.09,.32-.15,.62-.24,.89s-.17,.52-.24,.74l-.21,.56c-.11,.31-.18,.48-.18,.48l-.03,.08c-.26,.65-.22,1.37,.11,1.99,.31,.42,.77,.21,1.02-.47,.02-.05,.04-.11,.05-.16l.18-.61c.06-.19,.12-.43,.2-.7,.07-.29,.15-.61,.23-.96,.09-.34,.15-.76,.24-1.17,.02-.11,.04-.21,.06-.32s.03-.23,.05-.34c.03-.23,.06-.46,.09-.7s.04-.49,.06-.74c0-.13,.02-.25,.02-.38s0-.26,0-.38c0-.51-.01-1.02-.06-1.52-.03-.24-.06-.48-.09-.72-.04-.23-.08-.45-.12-.68s-.1-.42-.15-.62-.1-.39-.16-.57c-.11-.38-.23-.69-.34-1-.11-.29-.23-.58-.33-.83-.41-.98-.68-1.63-.68-1.63h0c-.08-.2-.24-.2-.35-.01-.1,.2-.13,.44-.07,.66">
                            </path>
                            <path id="av" class="my" d="M878.05,1326.21c-.23-.35-.91-3.04-1.61-2-.87,1.31,2.09,3.94,2.82,4.1,.21,.03-.55-1.16-1.21-2.1">
                            </path>
                            <path id="aw" class="my" d="M875.17,1321.01s-.6-1.22-1.49-3.04c-.23-.45-.45-.95-.69-1.47-.23-.53-.48-1.08-.71-1.68-.12-.29-.24-.59-.34-.91s-.23-.62-.32-.95-.2-.65-.29-.98l-.25-1c-.13-.68-.27-1.35-.35-2.04l-.07-.5c-.02-.17-.03-.34-.04-.51l-.08-.99c0-.33-.01-.65-.02-.96,0-.16,0-.31-.01-.46s0-.31,0-.46c.02-.6,0-1.16,.06-1.67,.04-.51,.07-.99,.1-1.4,.05-.41,.09-.77,.12-1.07,.07-.59,.1-.92,.1-.92l.02-.15c.16-1.24-.15-2.49-.87-3.51-.62-.65-1.25-.12-1.39,1.18-.01,.1-.02,.21-.02,.31,0,0-.02,.42-.05,1.15-.02,.37-.04,.81-.06,1.32,0,.53,0,1.13-.01,1.79-.02,.64,.03,1.41,.05,2.17,0,.2,.01,.39,.02,.59s.03,.42,.05,.63c.04,.42,.07,.85,.11,1.28,.05,.44,.12,.89,.18,1.35,.03,.23,.06,.45,.1,.68s.09,.46,.13,.69c.16,.92,.39,1.82,.63,2.7,.13,.42,.26,.84,.39,1.26,.14,.4,.29,.78,.43,1.16s.3,.71,.44,1.06,.3,.66,.45,.96c.3,.63,.59,1.15,.87,1.67,.28,.49,.55,.96,.79,1.36,.97,1.6,1.62,2.67,1.62,2.67h0c.2,.33,.44,.29,.54-.1,.09-.41,.04-.83-.13-1.21">
                            </path>
                            <path id="ax" class="n" d="M880.77,1336.13c.62,.05,1.23-.18,1.65-.65,.2-.25,.32-.56,.35-.88,.63,.58,1.43,.96,2.28,1.06,.54,0,1.24-.25,1.57-1.4,.36-.44,1.62-2.43,.6-7.64-.02-.27-.57-7.81-1.98-11.61-.17-2.56,.05-5.14,.65-7.63,.11-.41,2.6-10.16,.8-15.49,.08-.19,.23-.55,.42-1.05,.08-.22-.03-.46-.24-.54-.11-.04-.24-.03-.35,.03-3.89,2.14-7.62,3.43-9.97,3.43-.59,.02-1.19-.09-1.73-.34,.01,0-1.35-1.06-4.55-1.06-2.32,.06-4.62,.47-6.82,1.23-1.14,.31-2.33,.45-3.51,.42-2.26-.02-4.5-.38-6.65-1.06-.22-.07-.45,.06-.52,.28-.02,.06-.02,.13-.01,.2,.23,1.2,.38,2.4,.46,3.62,.11,.87,2.83,20.63,9.6,25.21,.5,.47,13.5,12.37,15.7,13.42,.72,.28,1.48,.43,2.25,.46m1.51-2.96c-.07,0-.14,.02-.2,.05-.17,.09-.25,.28-.21,.46,.14,.42,.1,.88-.1,1.28-.27,.25-.63,.38-1,.33-.66-.03-1.31-.16-1.92-.4-1.64-.79-10.87-9.05-15.52-13.3-6.51-4.4-9.27-24.43-9.29-24.63-.06-1.02-.18-2.03-.35-3.03,2.03,.58,4.13,.89,6.25,.91,1.27,.04,2.54-.12,3.77-.46,2.11-.73,4.32-1.13,6.55-1.18,2.87,0,4.09,.92,4.1,.92,.68,.34,1.43,.5,2.18,.48,2.32,0,5.69-1.08,9.36-2.99-.03,.07-.04,.1-.05,.1-.04,.1-.05,.21-.01,.31,1.82,5.05-.74,15.06-.77,15.17-.64,2.61-.87,5.3-.67,7.97,0,.03,.01,.07,.02,.1,1.38,3.67,1.95,11.4,1.95,11.48,1.06,5.42-.43,7.01-.44,7.02-.05,.05-.09,.12-.11,.19-.23,.87-.63,.87-.79,.87-.83,0-2.09-1.13-2.46-1.53-.08-.08-.19-.13-.3-.13">
                            </path>
                            <path id="ay" class="n" d="M859.93,1294.84h0c1.27,.04,2.54-.12,3.77-.46,2.11-.73,4.32-1.13,6.55-1.18,2.87,0,4.09,.92,4.1,.92,.68,.34,1.43,.5,2.18,.48,2.53,0,6.31-1.29,10.38-3.53,.09-.05,.16-.13,.19-.22,1.39-3.71,5.28-16.23-2.8-21.7,0,0-.42-.37-1.08-.87-.05-.04-.1-.06-.16-.08-5.85-1.41-9.53-1.04-10.92,1.11-.02,.03-.03,.06-.05,.1-.14,.29-.45,.46-.77,.43-.64,0-1.86-.43-4.03-2.46-1.49-1.21-3.37-1.83-5.29-1.77-3.58,0-7.45,1.87-11.49,5.54-.04,.04-.07,.08-.1,.13-.97,1.75-1.35,3.76-1.09,5.74,0,.23,.02,7.43,2.49,12.37,0,0,.51,1.84,.91,4.04,.03,.15,.14,.28,.29,.33,2.23,.7,4.56,1.07,6.9,1.1m10.33-2.48c-2.32,.06-4.62,.47-6.82,1.23-1.14,.31-2.32,.45-3.51,.42-2.17-.02-4.33-.35-6.41-.99-.41-2.16-.9-3.92-.91-3.94-2.4-4.83-2.44-12.07-2.44-12.14-.23-1.8,.11-3.63,.98-5.23,3.86-3.49,7.51-5.27,10.86-5.27,1.71-.06,3.38,.48,4.72,1.54,1.9,1.79,3.45,2.69,4.6,2.69,.66,.04,1.27-.34,1.54-.94,1.17-1.75,4.6-2.01,9.91-.74,.62,.48,1,.81,1,.81,7.52,5.09,3.96,16.87,2.58,20.6-3.84,2.1-7.51,3.35-9.84,3.35-.59,.02-1.19-.09-1.73-.34,.01,0-1.35-1.06-4.55-1.06">
                            </path>
                            <path id="b" class="n" d="M850.81,1271.87c.1,0,.2-.04,.28-.11,3.88-3.53,7.56-5.32,10.92-5.32,1.71-.06,3.38,.48,4.72,1.54,1.9,1.79,3.45,2.69,4.6,2.69,.66,.04,1.27-.34,1.54-.94,1.18-1.76,4.64-2.01,10-.72,.19,.05,.39-.05,.48-.23,.09-.18,.03-.39-.12-.51-1.8-1.38-5.28-3.68-8.31-3.68-1.23-.04-2.43,.43-3.31,1.3-.49,.57-1.17,.97-1.91,1.11-.27,0-.52-.12-.68-.33-.02-.02-.04-.04-.06-.06-.19-.14-4.67-3.5-9.1-3.5-2.01-.06-3.94,.8-5.24,2.33-1.66,1.7-3.05,3.63-4.14,5.73-.07,.08-.11,.18-.11,.28,0,.23,.2,.41,.43,.42h.01Zm26.32-4.52c-2.46,0-4.14,.66-4.98,1.95-.02,.03-.04,.06-.05,.1-.14,.29-.45,.46-.77,.43-.64,0-1.86-.43-4.03-2.46-1.49-1.21-3.37-1.83-5.29-1.77-3.04,0-6.28,1.34-9.66,3.99,.84-1.28,1.81-2.48,2.87-3.58,1.15-1.36,2.85-2.12,4.63-2.07,3.96,0,8.15,3.01,8.56,3.31,.32,.37,.79,.59,1.28,.59,1.23,0,2.39-1.23,2.51-1.37,.72-.7,1.69-1.08,2.7-1.05,2.05,0,4.37,1.19,6.14,2.34-1.3-.26-2.61-.39-3.93-.41">
                            </path>
                        </g>
                        <g id="IPR_LL7" ${IPRArray.LL7.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="ba" class="mk" d="M798.02,1265.08c.17,.09,.32,.21,.45,.35,2.38-2.27,6.55,.99,7.59,1.88,.23,.37,.35,.6,.35,.6,1.98,2.46,3.08,.82,3.08,.82,1.5-1.4,3.09-2.27,6.67-3.69,2.11-.2,4.19,.56,5.66,2.09,9.71,5.78,4.25,17.66,2.89,20.27-5.08,3.41-7.61,2.63-11.8,2.36,0,0-6.74-3.11-12.12,.27,0,0-2.94,1.25-8.48,.36-.93-3.56-2.06-4.35-2.06-4.35-2.11-4.65-2.33-9.93-.62-14.74,3.24-.31,6.02-4.02,8.39-6.21">
                            </path>
                            <path id="bb" class="nc" d="M804.96,1285.16l-.41,.27-.47,.32c-.18,.12-.38,.26-.59,.4s-.45,.28-.7,.42c-.13,.06-.26,.12-.39,.19-.14,.06-.28,.11-.42,.16s-.3,.08-.45,.13-.32,.05-.48,.08c-.17,.02-.33,.04-.5,.04h-.51c-.17,0-.34,0-.52-.03l-.51-.07c-.34-.04-.68-.13-1-.19-.32-.08-.63-.16-.92-.24s-.57-.18-.82-.25-.49-.15-.69-.23-.38-.14-.53-.19l-.46-.17,.44,.21,.51,.24c.2,.1,.42,.19,.67,.29s.51,.23,.8,.33,.59,.22,.91,.33c.32,.09,.66,.21,1,.29l.53,.12c.18,.04,.36,.05,.54,.08l.27,.04h.28c.18,.02,.37,.03,.55,.02,.18-.02,.37-.01,.55-.04s.36-.05,.53-.1,.34-.09,.51-.14,.31-.12,.47-.18c.29-.13,.57-.26,.81-.39s.46-.25,.65-.35l.48-.27,.43-.23h0c.25-.13,.35-.45,.22-.7h0c-.14-.27-.46-.36-.72-.22l-.04,.02">
                            </path>
                            <path id="bc" class="nc" d="M809.08,1271.83l.55,1.81c.08,.27,.16,.56,.25,.87s.17,.64,.24,.99c.04,.17,.08,.35,.1,.53s.07,.36,.08,.55,.04,.38,.06,.56l.03,.57c0,.38,0,.76-.04,1.14l-.02,.28c0,.09-.02,.18-.04,.28-.03,.18-.05,.36-.08,.54-.04,.18-.08,.35-.11,.52l-.05,.25c-.02,.08-.04,.16-.06,.24-.09,.32-.15,.62-.25,.89s-.17,.52-.24,.74-.15,.4-.21,.56l-.18,.48-.03,.08c-.26,.65-.22,1.37,.11,1.99,.31,.42,.77,.21,1.02-.47,.02-.05,.04-.11,.05-.16l.18-.61c.06-.19,.12-.43,.2-.7,.07-.29,.15-.61,.23-.96,.09-.34,.15-.76,.24-1.17,.02-.1,.04-.21,.06-.32s.03-.23,.05-.34c.03-.23,.06-.47,.09-.7s.04-.5,.06-.75c0-.13,.02-.25,.02-.38s0-.26,0-.38c0-.51-.01-1.02-.06-1.52-.03-.24-.06-.48-.09-.72s-.08-.45-.12-.68-.1-.42-.15-.62-.1-.39-.16-.57c-.11-.37-.23-.69-.34-1-.12-.29-.23-.58-.33-.83-.41-.98-.68-1.62-.68-1.62h0c-.08-.2-.24-.21-.35-.02-.1,.2-.13,.44-.07,.66">
                            </path>
                            <path id="bd" class="mw" d="M792.31,1290.39c5.54,.89,8.48-.36,8.48-.36,5.37-3.38,12.12-.27,12.12-.27,4.19,.27,6.72,1.05,11.8-2.36-.17,.34-.28,.52-.28,.52-6.66,9.99,8.87,24.72-4.56,36.33-3,2.59-2.48-2.09-2.48-2.09,.52-9.26-4.17-13.43-4.17-13.43-5.34-7.69-7.95-1.56-7.95-1.56-2.48,5.09,3.91,16.69,3.91,16.69-.39,4.17-4.7,1.17-4.7,1.17-11.87-8.22-10.95-21.52-10.95-21.52,.06-6.4-.52-10.51-1.2-13.13">
                            </path>
                            <path id="be" class="nb" d="M806.41,1267.91s-.12-.23-.35-.6c.15,.13,.24,.21,.24,.21,5.09-5.35,7.3-1.56,7.3-1.56,.78-.47,1.65-.78,2.56-.92-3.58,1.42-5.17,2.29-6.67,3.69,0,0-1.09,1.64-3.08-.82">
                            </path>
                            <path id="bf" class="nb" d="M798.02,1265.08c-2.37,2.19-5.14,5.9-8.39,6.21,.06-.16,.1-.25,.1-.25,4.61-6.91,7.29-6.51,8.29-5.96">
                            </path>
                            <path id="bg" class="my" d="M792.3,1290.38h0s.04,0,.05,0c.66,.1,1.28,.18,1.86,.23,.77,4,1.09,8.08,.97,12.16,0,0-.91,13.3,10.96,21.52,.77,.53,1.64,.88,2.56,1.03-1.2,1.82-4.25-.31-4.25-.31-11.87-8.22-10.95-21.52-10.95-21.52,.05-6.39-.52-10.49-1.2-13.11">
                            </path>
                            <path id="bh" class="nc" d="M790.25,1286.03c-2.11-4.65-2.33-9.93-.62-14.74,.53-.06,1.05-.19,1.55-.4-1.59,4.72-1.32,9.87,.74,14.41,0,0,1.33,.92,2.29,5.32-.59-.05-1.23-.13-1.9-.24-.93-3.57-2.06-4.35-2.06-4.35">
                            </path>
                            <path id="bi" class="my" d="M808.85,1292.93c.93,1.69,.1,3.36-.09,5.12-.1,1.18-2.31,3.47-1.01,4.53,.93,.76,2.25-3.83,2.23-4.49-.07-2.01,.54-3.71-.82-5.59-.51-.11-.53,.02-.31,.43">
                            </path>
                            <path id="bj" class="n" d="M795.85,1291.11h0c1.63,.06,3.26-.18,4.81-.71,1.7-1.05,3.67-1.58,5.67-1.54,2.1,.03,4.17,.46,6.11,1.26,.05,.02,.1,.03,.15,.04,.53,.03,1.04,.08,1.53,.12,.94,.08,1.82,.15,2.71,.15,1.97,0,4.29-.33,7.83-2.7,.06-.04,.11-.09,.14-.15,1.26-2.42,7.03-14.78-3-20.79-1.35-1.38-3.18-2.18-5.11-2.23-.29,0-.58,.02-.87,.06-.03,0-.07,.01-.1,.03-3.67,1.46-5.26,2.34-6.8,3.77-.02,.02-.04,.05-.06,.08-.16,.21-.42,.34-.68,.35-.34,0-.92-.21-1.71-1.19,0,0-.13-.24-.33-.57-.02-.04-.05-.07-.08-.1-.98-.83-3.5-2.77-5.81-2.77-.73-.01-1.45,.22-2.04,.65-.08-.06-.16-.11-.25-.16-.16-.09-.36-.06-.49,.06-.53,.49-1.07,1.05-1.65,1.64-1.93,1.99-4.12,4.24-6.5,4.47-.16,.02-.3,.12-.35,.27-1.74,4.92-1.52,10.32,.64,15.07,.03,.07,.08,.12,.14,.17,0,0,1.03,.8,1.89,4.11,.04,.16,.17,.28,.34,.31,1.29,.21,2.59,.32,3.9,.33m4.43-1.45c-1.43,.45-2.93,.66-4.43,.61-1.17,0-2.34-.1-3.49-.28-.8-2.94-1.74-3.96-2.05-4.24-1.99-4.45-2.22-9.48-.65-14.09,2.57-.38,4.79-2.66,6.75-4.68,.48-.49,.93-.96,1.37-1.38,.03,.03,.06,.05,.09,.08,.08,.09,.18,.14,.3,.15,.11,0,.23-.04,.31-.11,.47-.45,1.1-.7,1.75-.68,2.05,0,4.45,1.88,5.22,2.52,.2,.32,.3,.52,.31,.53,.85,1.07,1.65,1.58,2.41,1.58,.53,0,1.02-.26,1.35-.68,1.44-1.33,2.96-2.17,6.47-3.56,.24-.03,.47-.05,.71-.05,1.71,.07,3.33,.79,4.53,2.01,.03,.03,.06,.06,.1,.08,9.32,5.55,4.07,17.11,2.78,19.62-3.31,2.19-5.45,2.5-7.27,2.5-.85,0-1.71-.08-2.63-.15-.47-.04-.96-.08-1.47-.12-2.02-.84-4.19-1.29-6.39-1.31-2.13-.04-4.24,.53-6.06,1.64">
                            </path>
                            <path id="bk" class="n" d="M806.99,1326.48h0c.77,0,2.1-.34,2.31-2.6,0-.08,0-.17-.05-.24-.06-.11-6.26-11.48-3.9-16.31,.02-.04,.91-2.08,2.61-2.08,1.35,0,2.95,1.28,4.63,3.7,.02,.03,.04,.05,.06,.08,.05,.04,4.54,4.17,4.04,13.1-.02,.19-.21,2.1,.52,2.92,.57,.64,1.49,.51,2.65-.49,7.88-6.81,5.99-14.85,4.33-21.95-1.25-5.32-2.43-10.35,.31-14.47,.01-.02,.13-.21,.31-.56,.11-.21,.02-.46-.18-.56-.13-.07-.29-.06-.42,.02-3.35,2.25-5.52,2.55-7.36,2.55-.84,0-1.71-.08-2.63-.15-.47-.04-.96-.08-1.47-.12-2.02-.84-4.19-1.29-6.38-1.31-2.13-.04-4.24,.53-6.06,1.64-1.43,.46-2.93,.66-4.43,.61-1.26,0-2.52-.11-3.76-.32-.14-.02-.28,.03-.38,.13-.1,.1-.13,.25-.1,.39,.84,3.2,1.24,7.58,1.19,13.02,0,.11-.79,13.61,11.14,21.87,.9,.63,1.95,1.01,3.04,1.12m1.46-2.55c-.18,1.53-.92,1.71-1.46,1.71-.92-.11-1.8-.44-2.57-.97-11.53-7.98-10.79-21.02-10.78-21.15,.13-4.24-.23-8.49-1.06-12.65,1.08,.15,2.18,.23,3.27,.23,1.63,.06,3.26-.18,4.81-.71,1.7-1.05,3.67-1.58,5.67-1.54,2.1,.03,4.17,.46,6.11,1.27,.05,.02,.1,.03,.15,.04,.53,.03,1.04,.08,1.53,.12,.94,.08,1.82,.15,2.71,.15,2.26,.01,4.48-.62,6.4-1.81-2.21,4.2-1.07,9.05,.13,14.18,1.69,7.2,3.44,14.65-4.06,21.13-.69,.59-1.06,.68-1.22,.68-.1,0-.19-.04-.25-.12-.38-.42-.38-1.73-.31-2.29,.51-9.04-3.78-13.3-4.27-13.76-1.86-2.67-3.64-4.02-5.29-4.02-2.25,0-3.33,2.46-3.37,2.57-2.43,4.98,3.16,15.64,3.87,16.94">
                            </path>
                            <path id="bl" class="n" d="M808.17,1269.67h0c.53,0,1.02-.26,1.35-.68,1.45-1.34,2.98-2.18,6.51-3.58,.21-.09,.32-.33,.23-.54-.07-.18-.25-.28-.44-.26-.83,.12-1.64,.39-2.38,.79-.63-.75-1.56-1.18-2.53-1.17-1.48,0-3.13,.91-4.92,2.71-.15-.09-.35-.08-.48,.04-.16,.13-.19,.36-.08,.54,.22,.35,.34,.57,.34,.58,.85,1.07,1.65,1.58,2.41,1.58m4.59-3.77c-1.41,.62-2.71,1.47-3.84,2.51-.02,.02-.04,.05-.06,.08-.16,.21-.42,.34-.68,.35-.49,0-1.08-.41-1.71-1.19,1.65-1.69,3.18-2.58,4.44-2.58,.71,0,1.39,.3,1.86,.84">
                            </path>
                            <path id="bm" class="n" d="M789.34,1271.7h.04c2.68-.26,4.99-2.63,7.02-4.72,.57-.58,1.1-1.13,1.61-1.61,.17-.16,.18-.42,.03-.59-.03-.03-.07-.06-.1-.08-.4-.22-.86-.33-1.31-.33-2.16,0-4.69,2.16-7.53,6.42-.06,.11-.1,.22-.14,.34-.08,.22,.03,.46,.24,.54,.05,.02,.1,.03,.15,.03m7.61-6.46c-.38,.36-.75,.76-1.15,1.16-1.7,1.74-3.59,3.7-5.64,4.3,3.28-4.75,5.45-5.49,6.46-5.49,.11,0,.22,0,.33,.03">
                            </path>
                        </g>
                        <g id="IPR_LL6" ${IPRArray.LL6.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="bn" class="my" d="M753.69,1268.26h.04s-.02,0-.03,0h0"></path>
                            <path id="bo" class="mk" d="M747.18,1263.5c4.71,.13,9.3,3.09,9.3,3.09,.08-.07,.15-.14,.22-.2,.58,.6,1.12,1.23,1.63,1.89,1.78-3.18,9.46-2.99,9.46-2.99-.36-.3-.74-.59-1.14-.84,2.39,.43,4.72,1.15,6.93,2.14,10.42,4.41,3.34,20.3,3.34,20.3-.13,.46-.26,.94-.37,1.43-4.93,1.89-10.91,2.49-14.7,1.89,0,0-5.25-1.68-9.91,.03,0,0-2.73,1.13-10.51-1.9-.38-1.14-.94-2.21-1.65-3.17-2.15-4.15-2.81-8.91-1.87-13.49,0-.03,.01-.05,.02-.08,2.59-3.92,7.55-7.08,9.24-8.08">
                            </path>
                            <path id="bp" class="nb" d="M758.33,1268.28c-.51-.66-1.05-1.3-1.63-1.89,2.68-2.42,6.57-2.51,9.95-1.94,.4,.26,.78,.54,1.14,.84,0,0-7.67-.19-9.46,2.99">
                            </path>
                            <path id="bq" class="nb" d="M747.18,1263.5c-1.69,1.01-6.65,4.16-9.24,8.08,1.62-6.48,5.47-8.19,9.24-8.08">
                            </path>
                            <path id="br" class="mw" d="M741.44,1288.32c7.77,3.03,10.51,1.9,10.51,1.9,4.66-1.71,9.91-.03,9.91-.03,3.79,.61,9.77,0,14.7-1.89-3.29,14.6,3.84,40.11,3.84,40.11,.8,4.54-3.47,2.54-3.47,2.54-10.95-4.14-14.16-21.1-14.16-21.1-3.47-6.94-6.14-.53-6.14-.53-1.2,4.67,6.14,25.64,6.14,25.64,2,7.34-5.88,1.34-5.88,1.34-14.82-12.95-13.75-35.26-13.75-35.26,.21-6.1-.74-10.21-1.69-12.72">
                            </path>
                            <path id="bs" class="nc" d="M759.09,1269.74c1.11,1.4,1.29,3.47,1.21,5.18-.13,1.94-.61,3.85-1.43,5.62-.38,.61-.63,1.29-.75,2-.01,.71,.5,1.58,1.32,1.44,.76-.13,.94-.95,1.13-1.57,.29-.92,.56-1.84,.75-2.79,.52-2.16,.57-4.41,.15-6.59-.22-1.1-.64-2.16-1.23-3.12-.19-.32-.42-.6-.69-.85-.41-.33-.74,.36-.46,.68">
                            </path>
                            <path id="bt" class="nc" d="M754.1,1286.95c-1.97,.35-3.97,.52-5.98,.51-.81-.01-1.62-.14-2.4-.38-.42-.14-.83-.31-1.22-.52-.25-.14-.45-.32-.72-.45-.3-.2-.64,.07-.43,.25,.28,.26,.59,.5,.92,.7,.73,.43,1.52,.74,2.35,.91,2.29,.38,4.62,.45,6.93,.22,.63-.04,1.44-.03,1.78-.39,.41-.45-.35-.98-1.22-.85">
                            </path>
                            <path id="bu" class="my" d="M741.42,1288.29h0c.78,.3,1.5,.56,2.18,.79,.99,3.65,1.4,7.44,1.19,11.22,0,0-1.07,22.3,13.76,35.26,0,0,2.55,1.94,4.38,2.27-.91,2.39-6.06-1.54-6.06-1.54-14.82-12.95-13.76-35.26-13.76-35.26,.21-6.12-.75-10.22-1.69-12.73">
                            </path>
                            <path id="bv" class="my" d="M758.92,1292.87c1.25,2.02,.6,4.29,.67,6.57,.08,1.53-1.97,4.8-.42,5.96,1.11,.84,1.85-5.26,1.74-6.09-.37-2.56,.03-4.84-1.71-7.03-.57-.06-.56,.11-.28,.59">
                            </path>
                            <path id="bw" class="n" d="M749.87,1290.54h0c.62,.03,1.24-.05,1.82-.23,1.46-.51,2.99-.76,4.53-.74,1.72,0,3.43,.25,5.09,.72,4.28,.71,10.39-.13,14.97-1.89,.13-.05,.23-.16,.26-.3,.11-.48,.23-.95,.36-1.4,.15-.32,4.05-9.23,1.52-15.65-.91-2.35-2.76-4.21-5.1-5.14-2.24-1.01-4.6-1.74-7.02-2.17-.23-.04-.44,.11-.49,.34-.03,.17,.04,.33,.18,.42,.05,.03,.09,.06,.14,.09-2.27,.09-6.51,.55-8.25,2.68-.29-.36-.74-.89-1.31-1.48-.15-.16-.4-.17-.57-.03-1.08-.65-5.08-2.86-9.24-2.98-.08,0-.16,.02-.23,.06-1.95,1.16-6.78,4.28-9.38,8.21-.03,.04-.05,.08-.06,.13-1.01,4.7-.34,9.6,1.89,13.86,.01,.03,.03,.05,.05,.08,.68,.93,1.21,1.96,1.58,3.05,.04,.11,.13,.2,.24,.24,4.53,1.77,7.39,2.14,8.99,2.14m6.36-1.81c-1.65-.02-3.28,.25-4.84,.79-.04,.01-2.73,.98-10.04-1.83-.39-1.1-.94-2.14-1.63-3.08-2.07-4.05-2.71-8.69-1.82-13.15,2.48-3.75,7.36-6.88,8.97-7.84,4.5,.18,8.92,2.99,8.97,3.01,.12,.08,.28,.09,.41,.02,.8,.87,1.32,1.56,1.33,1.57,.08,.12,.22,.18,.36,.17,.14,0,.27-.09,.34-.21,1.15-2.05,5.48-2.78,8.84-2.78h.24c.23,0,.42-.18,.43-.41,0-.04,0-.07-.01-.11,1.79,.43,3.53,1.02,5.2,1.77,2.14,.85,3.83,2.55,4.66,4.69,2.4,6.1-1.48,14.97-1.52,15.06-.13,.45-.24,.86-.34,1.29-3.57,1.3-7.34,1.98-11.14,2.01-1.05,0-2.09-.07-3.13-.23-1.72-.5-3.49-.74-5.28-.74">
                            </path>
                            <path id="bx" class="n" d="M757.92,1268.39s.02,0,.03,0c.14,0,.27-.09,.34-.21,1.15-2.05,5.48-2.78,8.84-2.78h.24c.23,0,.42-.18,.43-.41,0-.13-.05-.25-.15-.33-.38-.32-.77-.61-1.18-.87-.05-.03-.1-.05-.16-.06-4.43-.76-7.97-.06-10.3,2.04-.17,.15-.19,.42-.03,.59h0c.57,.6,1.1,1.22,1.6,1.86,.08,.11,.2,.17,.34,.17m8.23-3.81c-2.27,.09-6.51,.55-8.25,2.68-.24-.29-.58-.7-1-1.15,2.11-1.69,5.26-2.23,9.19-1.57,.02,.01,.04,.03,.07,.04">
                            </path>
                            <path id="by" class="n" d="M737.53,1271.69c.14,0,.27-.07,.35-.19,2.57-3.89,7.62-7.07,9.11-7.95,.2-.12,.26-.37,.15-.57-.07-.12-.21-.2-.35-.21-.11,0-.22,0-.34,0-3.29,0-7.59,1.46-9.32,8.4-.05,.2,.05,.4,.24,.48,.05,.02,.11,.04,.17,.04m7.66-8.01c-2.4,1.53-4.6,3.36-6.53,5.45,1.32-3.24,3.51-5.06,6.53-5.45">
                            </path>
                            <path id="c" class="n" d="M761.33,1338.72h0c.53,.03,1.03-.2,1.36-.61,.51-.67,.53-1.84,.06-3.57-.08-.24-7.3-20.93-6.14-25.42,.26-.62,1.26-2.38,2.46-2.38,.91,0,1.91,1.02,2.88,2.95,.25,1.28,3.58,17.26,14.41,21.35,.63,.28,1.31,.44,2,.47,.62,.04,1.22-.21,1.63-.67,.49-.59,.63-1.53,.4-2.8-.08-.29-7.07-25.61-3.84-39.94,.05-.23-.09-.45-.32-.5-.08-.02-.17-.01-.24,.02-3.63,1.35-7.48,2.05-11.35,2.08-1.05,0-2.09-.07-3.13-.23-1.72-.5-3.49-.75-5.28-.74-1.65-.02-3.28,.25-4.84,.79-.04,.02-2.77,.99-10.21-1.9-.22-.08-.46,.02-.54,.24-.04,.1-.04,.2,0,.3,.88,2.33,1.88,6.4,1.66,12.55-.01,.22-.91,22.65,13.9,35.59,.15,.11,3.19,2.42,5.13,2.42m-2.26-32.83c-1.99,0-3.2,2.83-3.25,2.95-1.24,4.8,5.83,25.08,6.13,25.94,.51,1.87,.26,2.57,.08,2.82-.17,.2-.43,.3-.7,.28-1.38,0-3.79-1.61-4.61-2.23-14.48-12.66-13.6-34.68-13.59-34.9,.23-4.06-.24-8.13-1.41-12.03,7.34,2.71,9.84,1.64,9.97,1.58,1.46-.51,2.99-.76,4.53-.74,1.72,0,3.43,.24,5.09,.72,4.07,.67,9.77-.05,14.26-1.63-2.88,14.64,3.93,39.31,4,39.56,.21,.69,.13,1.44-.23,2.08-.26,.27-.62,.4-.99,.37-.58-.03-1.15-.16-1.68-.4-10.63-4.02-13.89-20.63-13.92-20.8,0-.04-.02-.08-.04-.11-1.15-2.3-2.38-3.46-3.66-3.46">
                            </path>
                        </g>
                        <g id="IPR_UL3" ${IPRArray.UL3.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="ca" class="mw" d="M678.87,1213.15s-4.92-13.21-5.14-14.69c0,0-2.02-10.7-4.06-15.49,0,0-2.42-10.26-2.68-14.55,0,0-.33-10.5-1.3-15.19,0,0-.35-12.29-1.98-13.66,0,0-2.09-3.26-4.34,5.75-2.25,9.01-5.2,17.96-4.36,22.36,0,0-1.28,18.46-.5,21.17,0,0-.52,16.23-2.81,22.42,0,0-5.02,15.54,.92,19.94,0,0,3.65,3.11,7.2,5.63,5.04,3.57,9.71-.11,14.57-4.16,4.87-4.04,11.18-2.09,4.47-19.53">
                            </path>
                            <path id="cb" class="mk" d="M652.62,1231.21s3.65,3.11,7.2,5.63c5.04,3.57,9.71-.11,14.57-4.16,4.86-4.04,11.18-2.09,4.47-19.53,0,0-.89-2.4-1.94-5.28-.7-1.92-1.46-4.05-2.07-5.81-5.91-5.21-15.49-10.27-21.94,4.27-.25,1.54-.6,3.05-1.07,4.54-.05,.14-.09,.27-.14,.4,0,0-5.02,15.54,.92,19.94">
                            </path>
                            <path id="cc" class="mx" d="M655.09,1163.29c.66-3.99,1.56-7.93,2.71-11.81,.6-2.24,1.16-4.48,1.75-6.72,.34-1.53,.9-3,1.65-4.38,.42-.7,1.22-1.6,2.04-1.14-.09,.13-.18,.25-.25,.38-.75,1.37-1.31,2.85-1.65,4.38-.6,2.24-1.16,4.48-1.75,6.72-1.15,3.88-2.06,7.82-2.71,11.81-.24,1.4-.27,2.82-.11,4.23,.04,.33,.04,.66,0,.99-.28,4.27-.52,8.55-.64,12.82-.06,2.07-.13,4.17,0,6.24,.02,.32,.05,.63,.09,.95,.04,.16,.07,.32,.09,.49-.02,.64-.05,1.28-.08,1.92-.15,3.12-.37,6.24-.69,9.34-.09,.86-.19,1.72-.29,2.58-.88,1.31-1.65,2.69-2.28,4.13,.03-.17,.05-.33,.08-.5,.29-1.81,.52-3.63,.7-5.45,.32-3.11,.54-6.22,.69-9.34,.03-.64,.06-1.28,.08-1.92-.02-.16-.05-.33-.09-.49-.05-.31-.08-.63-.09-.95-.13-2.07-.07-4.17,0-6.24,.12-4.28,.36-8.55,.64-12.82,.02-.25,.03-.51,.02-.76,0-.04,0-.06,0-.06,0-.05-.02-.1-.02-.15,0,0,0-.01,0-.02-.16-1.41-.13-2.83,.11-4.23">
                            </path>
                            <path id="cd" class="nc" d="M649.76,1222.12c.12-2.43,.46-4.84,1.02-7.2,.27-1.19,.57-2.39,.94-3.55,.58-1.68,1-3.41,1.25-5.17,.63-1.44,1.4-2.83,2.28-4.13-.12,.96-.25,1.92-.41,2.87-.26,1.93-.7,3.82-1.33,5.66-.38,1.17-.67,2.36-.94,3.55-.56,2.37-.9,4.78-1.02,7.2-.09,2.37,.04,4.95,1.15,7.1,.45,.84,1.07,1.58,1.82,2.17,1.33,1.13,2.69,2.22,4.07,3.29,.89,.69,1.79,1.36,2.7,2.02,.85,.65,1.81,1.14,2.83,1.45,1.21,.31,2.48,.29,3.69-.05-1.22,.62-2.56,.95-3.93,.95-1.47-.06-2.88-.56-4.06-1.44-1.84-1.31-3.71-2.77-5.08-3.88-1.27-1.03-2.11-1.75-2.11-1.75-1.83-1.36-2.62-3.78-2.83-6.48-.06-.87-.06-1.74-.02-2.61">
                            </path>
                            <path id="ce" class="nc" d="M671.81,1204.22c.71,2.62,1.91,6.03,2.89,9.81,.51,1.92,.87,3.88,1.09,5.85,.1,.94,.14,1.89,.13,2.83,0,.82-.08,1.64-.2,2.45-.09,.63-.23,1.25-.41,1.86-.12,.43-.27,.86-.44,1.27-.28,.64-.45,.98-.45,.98v.02c-.58,1.1-1.73,.84-2.58-.59s-1.08-3.49-.5-4.59c.06-.13,.15-.24,.24-.35,0,0,.14-.15,.38-.44,.14-.19,.27-.38,.38-.58,.16-.28,.3-.58,.41-.89,.15-.42,.26-.85,.33-1.29,.1-.58,.15-1.17,.16-1.75,.01-1.56-.1-3.11-.34-4.65-.48-3.42-1.33-7.09-1.76-9.86-.23-1.39,.33-1.39,.69-.09">
                            </path>
                            <path id="cf" class="n" d="M664.05,1238.83c3.76,0,7.4-3.03,10.62-5.7,.92-.73,1.92-1.36,2.97-1.9,3.97-2.17,7.1-3.88,1.63-18.11-1.36-3.66-4.94-13.43-5.11-14.6-.09-.46-2.06-10.81-4.08-15.59,0-.04-2.39-10.2-2.65-14.42-.01-.42-.34-10.58-1.31-15.25-.05-1.99-.43-12.29-2.07-13.86-.29-.42-.76-.68-1.28-.71-1.43,0-2.67,2.17-3.78,6.64-.49,1.96-1.01,3.93-1.52,5.84-1.88,7.03-3.49,13.1-2.85,16.64-.09,1.29-1.24,18.29-.5,21.2-.04,1.1-.61,16.36-2.78,22.23-.22,.66-5.04,15.9,1.06,20.42,.01,.02,3.68,3.14,7.2,5.64,1.29,.97,2.85,1.5,4.47,1.52m-1.3-99.29c.25,.03,.47,.17,.61,.38,.02,.03,.05,.07,.08,.09,1.08,.91,1.7,8.68,1.83,13.35,.96,4.67,1.3,15.08,1.3,15.19,.26,4.3,2.59,14.22,2.69,14.64,2.01,4.76,4.03,15.36,4.05,15.47,.22,1.49,4.96,14.22,5.16,14.76,5.21,13.55,2.5,15.03-1.25,17.08-1.1,.56-2.14,1.22-3.1,1.98-3.11,2.58-6.63,5.51-10.08,5.51-1.44-.02-2.84-.5-3.98-1.37-3.49-2.48-7.13-5.57-7.17-5.6-5.65-4.19-.84-19.34-.79-19.5,2.28-6.16,2.81-21.87,2.83-22.53,0-.04,0-.09-.02-.13-.6-2.09,.08-14.67,.52-21.03,0-.04,0-.07,0-.11-.64-3.35,1.04-9.65,2.82-16.33,.51-1.92,1.04-3.88,1.53-5.85,1.39-5.58,2.62-6.01,2.97-6.01">
                            </path>
                            <path id="cg" class="n" d="M664.06,1238.83c3.76,0,7.4-3.03,10.61-5.7,.92-.73,1.92-1.36,2.97-1.89,3.97-2.17,7.1-3.88,1.63-18.11,0,0-.89-2.4-1.94-5.27-.7-1.92-1.46-4.05-2.07-5.8-.02-.07-.06-.13-.12-.18-4.05-3.57-7.84-5.38-11.28-5.38-4.63,0-8.44,3.29-11.32,9.8-.01,.03-.02,.06-.03,.1-.24,1.52-.59,3.01-1.05,4.48-.06,.18-.1,.28-.13,.38-.22,.66-5.04,15.9,1.06,20.43,.01,.02,3.68,3.13,7.2,5.63,1.29,.97,2.85,1.51,4.47,1.52m10.45-36.4c.6,1.74,1.35,3.82,2.03,5.71,1.04,2.88,1.94,5.28,1.94,5.28,5.21,13.55,2.5,15.03-1.25,17.08-1.1,.56-2.14,1.22-3.1,1.98-3.1,2.58-6.62,5.51-10.08,5.51-1.44-.02-2.84-.5-3.98-1.37-3.49-2.48-7.13-5.57-7.17-5.6-5.65-4.19-.84-19.35-.79-19.5,.03-.09,.08-.21,.11-.32,.48-1.51,.85-3.05,1.1-4.62,2.73-6.14,6.28-9.25,10.54-9.25,3.2,0,6.78,1.72,10.64,5.1">
                            </path>
                        </g>
                        <g id="IPR_UL8" ${IPRArray.UL8.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="ch" class="nb" d="M915.12,1237.82h0"></path>
                            <path id="ci" class="nb" d="M921.35,1237.91l.26-.08-.26,.08"></path>
                            <path id="cj" class="nb" d="M920.82,1238.04c.08-.02,.16-.04,.24-.05-.08,.02-.16,.04-.24,.05"></path>
                            <path id="ck" class="nb" d="M919.08,1238.27h0"></path>
                            <path id="cl" class="nb" d="M917.2,1238.21s.08,0,.12,0c-.04,0-.08,0-.12,0"></path>
                            <path id="cm" class="nb" d="M915.49,1237.92h0"></path>
                            <path id="cn" class="nb" d="M917.64,1238.26h0"></path>
                            <path id="co" class="nb" d="M919.59,1238.22c.07,0,.13-.01,.2-.02-.07,0-.14,.01-.2,.02"></path>
                            <path id="cp" class="nb" d="M920.21,1238.15c.08-.01,.16-.03,.25-.04-.08,.01-.17,.03-.25,.04"></path>
                            <path id="cq" class="nb" d="M915.89,1238.01h0"></path>
                            <path id="cr" class="mx" d="M917.81,1238.27c.1,0,.2,0,.3,.01-.1,0-.2,0-.3-.01"></path>
                            <path id="cs" class="mx" d="M918.79,1238.28h0"></path>
                            <path id="ct" class="mx" d="M917.32,1238.23c.11,.01,.22,.02,.33,.03-.11,0-.22-.02-.33-.03"></path>
                            <path id="cu" class="mx" d="M915.13,1237.83c.11,.03,.23,.06,.35,.09-.12-.03-.24-.06-.35-.09"></path>
                            <path id="cv" class="mx" d="M919.29,1238.25c.1,0,.2-.02,.31-.03-.1,0-.2,.02-.31,.03"></path>
                            <path id="cw" class="mx" d="M906.23,1233.87s1.93,2.93,6.51,3.01h.03c.75,.41,1.54,.73,2.36,.95-.82-.22-1.61-.53-2.36-.93h-.03c-4.58-.09-6.51-3.02-6.51-3.02-2.57-5.52-3.4-9.99-3.42-13.42,.03,3.43,.85,7.89,3.42,13.42">
                            </path>
                            <path id="cx" class="mx" d="M915.91,1238.02c.43,.09,.86,.16,1.29,.2-.43-.05-.86-.11-1.29-.2"></path>
                            <path id="cy" class="mx" d="M915.52,1237.93c.12,.03,.24,.06,.37,.08-.13-.03-.25-.05-.37-.08"></path>
                            <path id="d" class="mx" d="M919.79,1238.21c.14-.02,.28-.04,.42-.06-.14,.02-.28,.04-.42,.06"></path>
                            <path id="da" class="mx" d="M921.06,1237.98c.1-.02,.2-.05,.3-.08-.1,.03-.2,.05-.3,.08"></path>
                            <path id="db" class="mx" d="M920.46,1238.1c.12-.02,.24-.04,.36-.07-.12,.03-.24,.05-.36,.07"></path>
                            <path id="dc" class="nc" d="M905.82,1210.44c.4-.75,.76-1.53,1.06-2.32h0c.59-.25,1.18-.47,1.75-.66-.3,.76-.64,1.5-1.02,2.22-.27,.5-.56,1-.88,1.49,0,0-5.58,7.22,1.29,21.95,0,0,1.93,2.93,6.51,3.01h.03c.06,.05,.24,.14,.5,.27-.75,.24-1.51,.41-2.29,.51,0,0-.02-.01-.03-.01-4.58-.08-6.51-3.01-6.51-3.01-2.57-5.52-3.4-9.99-3.42-13.42-.04-5.71,2.14-8.53,2.14-8.53,.32-.48,.61-.98,.88-1.49">
                            </path>
                            <path id="dd" class="mk" d="M915.05,1236.38c2.76,1.28,5.9,1.48,8.8,.55l-.03,.02c-.09,.04-.17,.08-.26,.13l-.3,.15c-.09,.04-.18,.08-.27,.12s-.19,.08-.29,.12-.18,.07-.27,.1-.19,.07-.28,.1-.18,.06-.27,.09-.19,.06-.28,.08-.17,.05-.25,.08c-.1,.03-.2,.05-.3,.08-.08,.02-.16,.04-.24,.05-.12,.03-.24,.05-.36,.07-.08,.01-.17,.03-.25,.04-.14,.02-.28,.04-.42,.06-.07,0-.13,.01-.2,.02-.1,0-.21,.02-.31,.03h-.21c-.1,.02-.19,.02-.29,.02h-.68c-.1,0-.2,0-.3-.01h-.16c-.11-.02-.22-.03-.33-.04-.04,0-.08,0-.12,0-.43-.05-.86-.11-1.29-.2h-.03c-.13-.03-.25-.06-.37-.09-.01,0-.02,0-.03,0-.12-.03-.24-.06-.35-.09h-.01c-.82-.22-1.61-.53-2.36-.93,.78-.1,1.54-.28,2.29-.51">
                            </path>
                            <path id="de" class="mw" d="M930.83,1207.59c-.62,.33-1.21,.72-1.74,1.18-1.35,.47-2.84,.27-4.01-.55-.33-.24-.63-.51-.9-.82,0,0-6.7-3.63-16.73,.54,1.17-3.11,1.82-6.38,1.92-9.7-1.15-20.74,3.5-25.88,3.5-25.88,3.86-8.01,4.58-13.44,4.58-13.44,1.72-4.15,3.72-2.22,3.72-2.22,.76,.42,1.3,1.15,1.5,1.99,1.8,4.92,1.07,16.88,1.07,16.88,1.3-4.15,3.37-8.02,6.1-11.41,.7-.89,1.46-1.74,2.26-2.53,4.86-5.57,5.36-1.07,5.36-1.07,.43,2.65-1.79,7.86-1.79,7.86-2.29,2.93-.5,13.94-.5,13.94,4.22,7.36,1.69,15.32,1.69,15.32-1.33,3.25,.43,9.38,.47,9.48-.27-.07-.55-.14-.83-.2-1.9-.49-3.92-.27-5.67,.62">
                            </path>
                            <path id="df" class="mk" d="M905.51,1211.75c.32-.48,.61-.98,.88-1.49,.4-.75,.76-1.53,1.06-2.32,10.04-4.17,16.73-.54,16.73-.54,.27,.31,.57,.58,.9,.82,1.17,.82,2.66,1.02,4.01,.55,.54-.46,1.12-.85,1.74-1.18,1.75-.89,3.77-1.11,5.67-.62,.28,.06,.56,.13,.83,.2,3.23,7.9,10.85,15.56-.18,27.06-2.51,.62-6.25,.23-10.79-2.69,0,0-1.43-1.84-4.39,1.09,0,0-3.79,3.46-8.65,4.09-.02,0-.03-.02-.03-.02-4.58-.07-6.51-3-6.51-3-6.86-14.73-1.29-21.95-1.29-21.95">
                            </path>
                            <path id="dg" class="my" d="M922.67,1158.69c2.02-7.11,4.67-5.85,4.67-5.85,3.61-.43,.92,7.26,2.51,11.32-2.73,3.39-4.8,7.26-6.1,11.41,0,0,.73-11.97-1.07-16.88">
                            </path>
                            <path id="dh" class="nb" d="M926.36,1231.54c4.53,2.92,8.27,3.31,10.79,2.69-.1,.1-.18,.2-.28,.3-2.46,2.5-10.13,.68-10.13,.68-3.74,3.21-9.05,3.81-13.41,1.51,4.85-.63,8.65-4.09,8.65-4.09,2.96-2.93,4.39-1.09,4.39-1.09">
                            </path>
                            <path id="di" class="mx" d="M922.76,1178.79c-1.35,5.2-2.4,10.47-3.14,15.78-.43,2.5-.57,5.05-.43,7.58,.1,1.09,1.8,4.68,2.8,1.95,.34-.94-.24-2.54-.25-3.5-.07-3.09,.05-6.19,.36-9.27,.26-2.85,.58-5.69,.91-8.53,.15-1.2,.31-2.4,.47-3.6,.05-.38-.51-1.22-.72-.41">
                            </path>
                            <path id="dj" class="mx" d="M919.76,1156.45c-.46,.56-.83,1.19-1.09,1.87,0,0-.72,5.43-4.58,13.44,0,0-4.65,5.15-3.5,25.88-.1,3.32-.75,6.6-1.92,9.7-.01,.03-.03,.07-.04,.1-.57,.19-1.15,.41-1.75,.66,1.17-3.1,1.82-6.38,1.92-9.7h0c-.13-2.27-.18-4.35-.18-6.26,0-15.54,3.68-19.62,3.68-19.62,3.86-8.01,4.58-13.44,4.58-13.44,.06-.15,.13-.29,.19-.43v-.03c.07-.12,.13-.23,.18-.34l.03-.06c.05-.1,.1-.19,.16-.28,.01-.02,.02-.04,.03-.05,.06-.09,.11-.18,.17-.26,0,0,.01-.02,.02-.02,.16-.24,.36-.46,.57-.66h0c.06-.06,.12-.11,.18-.15h.01c.06-.05,.12-.09,.18-.13h0c.34-.22,.75-.29,1.15-.22">
                            </path>
                            <path id="dk" class="nc" d="M925.59,1211.09c-.66,1.84-.21,3.71,.33,5.5,.34,1,.62,2.02,.83,3.06,.25,.91,.08,1.89-.47,2.65-.49,.57-1.32,.8-1.58,1.55-.25,.75,.15,1.57,.9,1.83,.75,.2,1.55-.06,2.02-.68,.68-.63,1.19-1.42,1.47-2.3,.71-2.37-.65-4.66-1.66-6.71-.57-1.01-.97-2.11-1.17-3.25-.06-.47-.04-.94,.04-1.4,.08-.44-.54-.71-.71-.24">
                            </path>
                            <path id="dl" class="n" d="M923.43,1176.2c.19,0,.35-.12,.4-.3,1.29-4.1,3.33-7.92,6.03-11.27,.09-.12,.12-.27,.06-.41-.62-1.58-.55-3.83-.5-5.82,.07-2.32,.12-4.32-.79-5.26-.41-.41-.98-.6-1.55-.52-.62-.2-3.23-.52-5.12,6.16-.02,.08-.02,.18,0,.26,1.75,4.78,1.05,16.6,1.05,16.72-.01,.21,.13,.4,.34,.44,.02,0,.05,0,.08,0m5.63-11.9c-2.1,2.65-3.81,5.59-5.1,8.72,.1-3.82,.08-10.58-1.17-14.13,1.87-6.46,4.05-5.45,4.06-5.45,.07,.03,.15,.04,.23,.03,.34-.07,.7,.02,.96,.26,.67,.69,.62,2.62,.56,4.66-.06,1.98-.12,4.21,.47,5.92">
                            </path>
                            <path id="dm" class="n" d="M927.28,1209.64c.56,0,1.12-.09,1.65-.28,.04-.02,.08-.04,.11-.07,.51-.44,1.07-.81,1.67-1.13,1.66-.86,3.58-1.07,5.39-.58,.28,.06,.55,.13,.81,.2,.22,.06,.45-.07,.51-.3,.02-.09,.02-.18-.02-.27-.28-.87-1.62-6.34-.46-9.16,.12-.36,2.54-8.21-1.67-15.62-.15-.96-1.63-10.91,.43-13.54,.02-.03,.04-.06,.06-.09,.09-.22,2.26-5.36,1.81-8.1-.08-.7-.58-2.07-1.9-2.07-1.1,0-2.47,.96-4.2,2.93-.81,.8-1.57,1.65-2.28,2.55-2.16,2.7-3.93,5.7-5.24,8.91,.1-3.87,.08-10.75-1.21-14.26-.23-.94-.84-1.73-1.67-2.21-.38-.31-.86-.49-1.36-.5-.3,0-.59,.07-.86,.2-.27,.04-.54,.14-.78,.28-.07,.04-.14,.09-.21,.14-.08,.06-.15,.12-.22,.18-.24,.22-.46,.47-.64,.74-.08,.11-.14,.21-.2,.3-.09,.15-.15,.25-.2,.35-.09,.18-.15,.3-.21,.42-.08,.17-.15,.32-.21,.48-.01,.03-.02,.07-.03,.1,0,.05-.75,5.45-4.51,13.27-.44,.53-3.75,5.05-3.75,19.85,0,1.98,.06,4.1,.18,6.28-.11,3.26-.74,6.48-1.89,9.53-.08,.22,.02,.46,.24,.54,.1,.04,.21,.04,.31,0,.11-.05,.23-.09,.33-.13h.04s.06-.02,.1-.02c.03,0,.07-.01,.1-.02,2.95-1.27,6.12-1.94,9.33-1.97,2.4-.06,4.78,.42,6.98,1.38,.28,.31,.58,.59,.92,.83,.8,.58,1.77,.88,2.76,.88m1.28-1.04c-.41,.13-.84,.2-1.28,.2-.81,0-1.61-.25-2.27-.72-.3-.22-.58-.47-.83-.75-.03-.04-.07-.07-.11-.09-2.33-1.07-4.88-1.59-7.44-1.52-3.21,.03-6.39,.68-9.36,1.92,1-2.91,1.56-5.95,1.64-9.02-.12-2.19-.18-4.29-.18-6.26,0-15.11,3.54-19.3,3.58-19.34,.03-.03,.05-.06,.06-.1,3.68-7.64,4.52-12.89,4.61-13.51,.05-.13,.11-.25,.16-.36,.07-.14,.12-.25,.18-.35,.08-.15,.13-.24,.18-.32,.08-.13,.13-.21,.19-.29,.15-.22,.33-.43,.52-.61,.06-.05,.11-.09,.16-.13s.11-.08,.15-.1c.16-.1,.33-.16,.51-.18,.05,0,.1-.02,.15-.04,.17-.09,.36-.14,.55-.14,.31,0,.61,.13,.85,.33,.04,.04,.09,.07,.14,.09,.47,.17,.9,.78,1.25,1.74,1.75,4.78,1.05,16.6,1.05,16.72-.02,.23,.15,.43,.38,.45,.2,.02,.38-.11,.43-.3,1.29-4.1,3.33-7.92,6.03-11.27,.69-.88,1.43-1.71,2.23-2.49,1.94-2.22,3.02-2.68,3.59-2.68,.91,0,1.07,1.33,1.07,1.35,.39,2.39-1.52,7.08-1.74,7.61-2.32,3.1-.62,13.77-.55,14.22,0,.05,.03,.1,.05,.14,4.07,7.11,1.68,14.91,1.65,14.99-1.11,2.71-.16,7.25,.28,9.03l-.16-.04c-2-.53-4.12-.29-5.95,.66-.63,.33-1.22,.72-1.76,1.18">
                            </path>
                            <path id="dn" class="n" d="M914.81,1238.45c.23,0,.42-.17,.43-.41,0-.2-.13-.37-.32-.42h-.03l-.3-.1h0c-.28-.09-.53-.18-.75-.26,.34-.08,.69-.18,1.03-.28,.02,0,.05-.02,.07-.03,2.58-.76,4.97-2.06,7.01-3.81,1.03-1.02,1.98-1.55,2.76-1.55,.38-.01,.75,.13,1.02,.41,.03,.04,.06,.07,.1,.09,3.05,1.97,6.11,3.01,8.84,3.01,.77,0,1.53-.08,2.28-.26,.08-.02,.15-.06,.2-.12,9.26-9.65,5.55-16.9,2.29-23.28-.74-1.45-1.44-2.82-2.02-4.22-.05-.12-.15-.21-.28-.24-.28-.08-.57-.15-.85-.21-2-.53-4.12-.29-5.95,.66-.63,.33-1.22,.73-1.76,1.18-.41,.13-.84,.2-1.28,.2-.81,0-1.61-.25-2.27-.72-.3-.22-.58-.47-.83-.75-.03-.04-.07-.07-.12-.09-2.33-1.06-4.86-1.57-7.42-1.5-2.84,.02-5.65,.53-8.31,1.51-.05,0-.11,0-.16,.01-.6,.21-1.2,.43-1.77,.67-.11,.05-.2,.14-.24,.25-.3,.77-.65,1.53-1.04,2.26-.28,.53-.56,1-.86,1.46-.08,.09-2.25,2.97-2.21,8.76,.03,4.15,1.2,8.73,3.46,13.59,.11,.18,2.1,3.13,6.77,3.24,.65,.34,1.32,.61,2.02,.83h0c.12,.04,.24,.08,.36,.11,.04,.01,.07,.02,.11,.02m-.29-2.23c-.67,.21-1.35,.36-2.04,.46-.02,0-.03,0-.05,0-4.3-.07-6.15-2.79-6.16-2.82-2.19-4.7-3.33-9.15-3.36-13.19-.04-5.47,2.03-8.25,2.05-8.27,.33-.5,.62-1,.92-1.55,.38-.72,.72-1.45,1.02-2.21,.45-.18,.91-.36,1.37-.52,.06,0,.12,0,.17-.02,2.63-.99,5.4-1.51,8.21-1.53,2.39-.06,4.77,.41,6.96,1.37,.27,.31,.58,.59,.92,.83,1.29,.9,2.93,1.12,4.41,.59,.04-.02,.08-.04,.11-.07,.51-.44,1.07-.81,1.67-1.13,1.66-.86,3.58-1.07,5.39-.58,.21,.04,.41,.09,.62,.15,.57,1.37,1.28,2.75,1.97,4.1,3.28,6.42,6.68,13.06-2.06,22.24-.64,.14-1.3,.21-1.96,.21-2.55,0-5.43-.98-8.34-2.84-.43-.44-1.01-.68-1.62-.67-1.02,0-2.14,.6-3.34,1.78-1.97,1.67-4.27,2.91-6.75,3.64-.03,0-.07,.02-.1,.04">
                            </path>
                            <path id="do" class="n" d="M918.13,1238.91l1.18-.06,.05-.43,.04,.42h.13c.14-.03,.29-.05,.43-.07l.2-.04,.04-.43,.08,.41c.1-.02,.21-.04,.31-.06l1.22-.33c1.73-.48,3.33-1.32,4.72-2.46,1.74,.38,3.52,.58,5.3,.61,2.39,0,4.07-.49,5.02-1.45l.29-.3c.16-.17,.15-.43-.01-.59-.1-.1-.25-.14-.39-.1-.68,.16-1.38,.24-2.08,.24-2.55,0-5.43-.98-8.34-2.84-.43-.44-1.01-.68-1.62-.67-1.02,0-2.14,.6-3.34,1.78-.02,.02-3.75,3.37-8.41,3.97-.09,.01-.18,.05-.24,.12-.11,.02-.21,.04-.32,.05-.18,.02-.32,.16-.36,.34-.03,.18,.05,.36,.21,.44,.78,.42,1.6,.74,2.46,.97,.13,.04,.25,.07,.38,.1,.15,.04,.28,.07,.41,.09,.45,.09,.9,.17,1.36,.21h.09c.14,.02,.25,.03,.37,.04h.18c.1,.02,.2,.02,.31,.02h.34Zm8.3-3.91c-.1,0-.19,.03-.27,.1-1.33,1.12-2.88,1.95-4.55,2.42l-1.19,.33c-.1,.02-.19,.04-.29,.05l-.11,.02-.18,.03c-.14,.02-.27,.04-.4,.06l-1.31,.08h-.32c-.1,0-.19,0-.28-.01h-.16c-.1-.02-.21-.02-.31-.04h-.12c-.42-.05-.83-.12-1.25-.2-.15-.03-.26-.06-.38-.09-.15-.04-.26-.07-.38-.1-.46-.13-.86-.27-1.19-.4,3.04-.65,5.86-2.06,8.2-4.09,1.03-1.02,1.98-1.55,2.76-1.55,.38-.02,.75,.13,1.02,.41,.03,.04,.06,.07,.1,.09,3.28,2.11,6.57,3.15,9.44,2.99-1.09,.4-2.26,.59-3.42,.55-1.79-.03-3.57-.24-5.31-.63-.03,0-.06-.01-.1-.01">
                            </path>
                        </g>
                        <g id="IPR_UL6" ${IPRArray.UL6.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="dp" class="mw" d="M825.42,1211.25s10.24,13.87-1.49,25.74c0,0-1.72,3.24-9.65-.55,0,0-6.92-5.61-13.83-1.38,0,0-6.31,3.23-12.39-.34,0,0-3.21-.77-3.81-7.45,0,0,.19-11.54,7.52-21.13,0,0-.28-3.95-.26-7.65,0,0-1.75-16.6,6.68-30.93,1.49-2.85,2.35-5.99,2.53-9.2,0,0-.19-5.9,3.76-3.89,0,0,2.25,.23,2.64,5.41,.05,1.24-.13,2.48-.52,3.66,0,0-1.59,4.02-1.46,6.94,0,0-.62,9.56,1.85,15.66,0,0,.9,5.22,3.05,.91,1.84-3.25,4-6.32,6.45-9.14,0,0,3.99-4.83,6.22-7,2.08-1.91,3.49-4.45,4.02-7.23,0,0,1.43-4.54,1.72-5.74,0,0,.97-4.28,3.89-2.92,0,0,2.17,.23,1.91,6.48,0,0,.13,3.11-2.3,8.95,0,0-7.68,13.28-9.04,22.66,0,0-.16,5.45,1.17,8.14,0,0,2.73,6.29,1.35,10.02">
                            </path>
                            <path id="dq" class="my" d="M806.99,1186.15s.9,5.22,3.05,.91c1.84-3.25,4-6.32,6.45-9.14,0,0,1.6-1.94,3.34-3.91l.15-.17h0c.04-.3,1.67-13.69,2.26-15.95,0,0,1.75-6.91-4.03-6.11,0,0-2.28-.07-4.1,5.37,0,0-3.05,10.25-8.98,13.35,0,0-.62,9.56,1.85,15.65">
                            </path>
                            <path id="dr" class="mk" d="M784.26,1227.27c.59,6.69,3.81,7.45,3.81,7.45,6.08,3.56,12.39,.34,12.39,.34,6.91-4.23,13.83,1.39,13.83,1.39,7.93,3.79,9.65,.55,9.65,.55,7.54-7.62,6.01-16.08,3.94-21.14-.48-1.18-1.04-2.32-1.69-3.41-3.42-2.41-8.31-4.84-13.1-3.62,0,0-5.44,1.81-10.01-.87-3.94-1.56-8.3-1.69-12.33-.39-.4,.59-.78,1.18-1.13,1.77-3.17,5.48-5.01,11.63-5.37,17.95">
                            </path>
                            <path id="ds" class="nb" d="M789.86,1228.74l.16,.79c.21,1.01,.65,1.95,1.3,2.76,.08,.1,.17,.18,.24,.26,.28,.3,.64,.53,1.03,.66,4.61,2.7,9.39,.25,9.39,.25,.52-.32,1.07-.58,1.64-.77,4.52-1.54,8.63,1.66,8.84,1.82h0c.28,.14,.55,.26,.8,.37,.11,.05,.21,.09,.32,.13,1.21,.55,2.53,.86,3.86,.9,1.83-.02,2.34-.98,2.34-.98,.17-.18,.34-.35,.5-.53-1.25-1.13-3.77-2.13-8.91-1.63-2.3-.76-4.38-2.06-6.08-3.79,0,0-1.52-2.61-5.71,1.28-1.01,.43-2.08,.68-3.18,.74-1.02,.07-2.03-.16-2.91-.68-.62-.4-1.12-.95-1.47-1.6,0,0-.56-1.49-2.18,0">
                            </path>
                            <path id="dt" class="mx" d="M807.61,1190.86c-1.45,3.23-2.43,6.65-2.89,10.16-.2,1.77-.24,3.56-.13,5.34,.08,1.07,1.47,2.91,2.4,1.15,.44-.83-.19-2.38-.28-3.16-.21-1.8-.22-3.61-.02-5.4,.14-1.83,.45-3.64,.92-5.41,.19-.75,.39-1.5,.65-2.24,.12-.34-.35-1.08-.65-.43">
                            </path>
                            <path id="du" class="mx" d="M802.33,1157.62c-.18,3.21-1.04,6.35-2.53,9.21-8.43,14.33-6.68,30.92-6.68,30.92-.02,3.7,.26,7.65,.26,7.65-.45,.59-.87,1.18-1.26,1.77-.51,.11-1.02,.25-1.55,.41,.3-.5,.64-.98,1.02-1.42,0,0-.28-3.95-.26-7.65,0,0-1.75-16.6,6.68-30.92,1.49-2.86,2.35-5.99,2.53-9.21,0,0-.15-4.67,2.6-4.28-.89,1.24-.81,3.51-.81,3.51">
                            </path>
                            <path id="dv" class="nc" d="M787.88,1234.75c-1.07-.43-1.94-1.26-2.42-2.3-.71-1.37-1.15-2.87-1.3-4.41-.11-1.61,0-3.23,.35-4.81,.49-3.01,1.31-5.97,2.44-8.8,.55-1.38,1.18-2.72,1.89-4.02,.38-.7,.79-1.39,1.22-2.05,.1-.15,.19-.29,.29-.44,.07-.11,.14-.21,.22-.31,.09-.1,.14-.06,.27-.1,.42-.13,.85-.24,1.29-.33-2.23,3.43-3.9,7.2-4.94,11.16-.51,1.9-.89,3.84-1.13,5.79-.1,.76-.17,1.54-.19,2.31,.02,.77,.12,1.54,.32,2.29,.4,1.87,1.23,4.09,3.02,5.07,.13,.07,.27,.14,.41,.18,.02,0,.04,0,.05,.02,.5,.3,1.03,.56,1.57,.78,1.81,.72,3.75,1.01,5.69,.86,1.25-.09,2.48-.33,3.67-.73-1.63,.86-3.42,1.36-5.26,1.48-2.6,.24-5.2-.33-7.46-1.63">
                            </path>
                            <path id="dw" class="nc" d="M805.97,1211.5c.5,1.89-.12,3.71-.82,5.45-.43,.97-.8,1.96-1.11,2.97-.33,.88-.25,1.87,.23,2.68,.44,.61,1.25,.91,1.43,1.68,.18,.77-.29,1.55-1.06,1.74-.77,.14-1.54-.2-1.95-.86-.62-.69-1.05-1.52-1.25-2.43-.5-2.43,1.06-4.58,2.26-6.54,.66-.95,1.15-2.01,1.45-3.13,.1-.46,.12-.93,.08-1.4-.04-.45,.61-.66,.73-.17">
                            </path>
                            <path id="dx" class="n" d="M820.74,1239h0c2.43,0,3.33-1.16,3.52-1.45,11.06-11.23,2.78-24.36,1.62-26.06,1.25-3.85-1.32-9.86-1.43-10.12-1.28-2.59-1.13-7.9-1.13-7.96,1.33-9.14,8.91-22.33,8.99-22.47,2.46-5.9,2.36-9.04,2.36-9.17,.25-5.99-1.72-6.77-2.21-6.87-.38-.18-.8-.28-1.22-.28-2.38,0-3.17,3.37-3.2,3.51-.28,1.17-1.7,5.66-1.71,5.7-.51,2.7-1.88,5.16-3.89,7.03-2.25,2.19-6.12,6.86-6.28,7.06-2.47,2.85-4.64,5.94-6.5,9.22-.7,1.4-1.12,1.47-1.2,1.47-.38,0-.88-1.2-1.06-2.27,0-.03-.01-.06-.02-.09-2.4-5.94-1.82-15.38-1.82-15.47-.12-2.84,1.41-6.77,1.43-6.81,.42-1.25,.6-2.56,.54-3.87-.37-4.93-2.44-5.65-2.92-5.75-1.31-.65-2.4-.56-3.17,.23-1.22,1.27-1.15,3.97-1.15,4.08-.19,3.14-1.03,6.2-2.48,8.99-8.4,14.28-6.75,31.01-6.73,31.17-.02,3.22,.2,6.7,.25,7.48-7.23,9.57-7.51,21.14-7.51,21.26,.57,6.49,3.55,7.69,4.06,7.85,1.96,1.14,4.18,1.72,6.45,1.71,2.18,0,4.32-.47,6.3-1.38,1.6-1,3.45-1.53,5.34-1.53,2.91,.12,5.71,1.12,8.04,2.87,.03,.02,.05,.04,.08,.05,2.05,1.1,4.32,1.74,6.65,1.88m10.51-83.54c.32,0,.63,.08,.92,.23,.04,.02,.09,.03,.13,.04,0,0,1.77,.39,1.54,6.05,0,.06,.09,3.15-2.27,8.8-.05,.08-7.71,13.41-9.07,22.76-.01,.28-.15,5.63,1.2,8.38,.02,.04,2.64,6.17,1.33,9.69-.05,.13-.03,.28,.06,.39,.41,.56,9.89,13.73-1.45,25.2-.03,.03-.06,.06-.08,.1-.02,.04-.63,1.07-2.82,1.07h0c-2.18-.14-4.31-.75-6.24-1.78-2.46-1.86-5.44-2.92-8.52-3.02-2.03,0-4.02,.57-5.75,1.64-1.85,.83-3.86,1.27-5.89,1.28-2.13,.02-4.23-.54-6.07-1.62-.04-.02-.07-.04-.11-.05-.02,0-2.93-.84-3.49-7.08,0-.07,.28-11.48,7.44-20.84,.06-.08,.09-.18,.08-.28,0-.04-.28-3.97-.26-7.62-.02-.21-1.64-16.68,6.62-30.72,1.53-2.91,2.41-6.12,2.59-9.4,0-.05-.07-2.49,.91-3.5,.52-.54,1.26-.53,2.24-.03,.05,.02,.1,.04,.15,.04,.01,0,1.91,.33,2.26,5.02,.04,1.19-.13,2.38-.5,3.52-.05,.13-1.61,4.1-1.47,7.07-.02,.35-.59,9.64,1.86,15.75,.11,.58,.6,2.92,1.88,2.92,.67,0,1.29-.62,1.95-1.94,1.82-3.22,3.96-6.25,6.39-9.05,.05-.06,4.01-4.85,6.21-6.98,2.15-1.97,3.61-4.59,4.14-7.46,.05-.14,1.42-4.51,1.71-5.71,0-.03,.68-2.87,2.39-2.87">
                            </path>
                            <path id="dy" class="n" d="M808.47,1189.48c.67,0,1.29-.62,1.95-1.94,1.83-3.22,3.97-6.25,6.39-9.05,.03-.03,1.63-1.97,3.34-3.91l.15-.17c.07-.08,.11-.18,.11-.28v-.08c.41-3.2,1.73-13.79,2.25-15.76,.04-.15,.87-3.52-.63-5.43-.8-1.03-2.11-1.44-3.86-1.2h0c-.25,0-2.61,.21-4.43,5.66-.03,.11-3.07,10.13-8.78,13.11-.13,.07-.22,.2-.23,.34-.02,.39-.59,9.69,1.86,15.8,.11,.58,.61,2.92,1.88,2.92m11.12-15.53l-.07,.08c-1.72,1.95-3.33,3.9-3.35,3.92-2.47,2.85-4.64,5.94-6.5,9.22-.7,1.41-1.12,1.48-1.2,1.48-.38,0-.88-1.2-1.06-2.27,0-.03-.01-.06-.02-.09-2.19-5.42-1.9-13.75-1.83-15.24,5.88-3.27,8.85-13.07,8.97-13.49,1.66-4.98,3.67-5.07,3.69-5.07,.29-.04,.59-.06,.89-.07,.86-.07,1.7,.28,2.26,.94,1.24,1.6,.48,4.68,.48,4.71-.53,2.02-1.86,12.65-2.25,15.87h0Z">
                            </path>
                            <path id="e" class="n" d="M820.74,1239c2.43,0,3.33-1.16,3.52-1.45,7.87-7.98,5.88-16.94,4-21.57-.49-1.2-1.06-2.35-1.72-3.47-.03-.05-.07-.09-.12-.13-4.86-3.43-9.47-4.7-13.44-3.68-1.33,.39-2.7,.59-4.08,.58-1.96,.04-3.9-.45-5.61-1.41-2.18-.91-4.53-1.36-6.9-1.32-1.96,0-3.91,.3-5.77,.89-.09,.03-.17,.09-.22,.16-.38,.55-.75,1.14-1.15,1.79-3.2,5.55-5.05,11.76-5.43,18.15,.57,6.49,3.55,7.69,4.06,7.85,1.96,1.13,4.18,1.72,6.44,1.71,2.18,0,4.32-.47,6.3-1.38,1.6-1,3.45-1.53,5.34-1.53,2.91,.12,5.71,1.12,8.04,2.87,.03,.02,.05,.04,.08,.05,2.05,1.1,4.32,1.74,6.65,1.88m5.13-25.98c.62,1.05,1.16,2.15,1.61,3.28,2.21,5.43,3.33,13.42-3.85,20.69-.03,.03-.06,.06-.08,.1-.02,.04-.63,1.07-2.82,1.07-2.18-.14-4.31-.75-6.24-1.78-2.46-1.86-5.44-2.92-8.52-3.02-2.03,0-4.02,.57-5.75,1.64-1.85,.83-3.86,1.27-5.89,1.28-2.13,.02-4.23-.54-6.07-1.62-.04-.02-.07-.04-.11-.05-.02,0-2.93-.83-3.49-7.08,.38-6.23,2.2-12.29,5.31-17.7,.35-.59,.69-1.13,1.03-1.63,1.74-.54,3.56-.81,5.38-.81,2.23-.02,4.44,.39,6.51,1.22,1.83,1.03,3.9,1.55,6,1.51,1.46,0,2.92-.2,4.32-.62,.82-.21,1.67-.31,2.52-.31,3.86,0,7.63,2.06,10.13,3.82">
                            </path>
                            <path id="ea" class="n" d="M817.38,1236.63h.08c1.8-.02,2.5-.89,2.66-1.14,.16-.17,.32-.33,.48-.5,.16-.17,.15-.43-.02-.59h0c-1.71-1.56-4.81-2.16-9.15-1.75-2.18-.75-4.16-1.99-5.8-3.62-.47-.66-1.24-1.04-2.04-1.01-1.22,0-2.64,.74-4.23,2.2-.94,.39-1.94,.62-2.96,.68-.09,0-.18,0-.26,0-.84,.03-1.68-.19-2.4-.62-.56-.36-1.01-.86-1.32-1.45-.21-.52-.7-.87-1.26-.88-.6,.05-1.16,.33-1.57,.77-.11,.1-.16,.25-.13,.39l.16,.79c.23,1.08,.7,2.09,1.39,2.95,.09,.11,.18,.2,.27,.29,.32,.34,.72,.59,1.16,.75,1.5,.86,3.2,1.31,4.92,1.3,1.67,0,3.31-.36,4.82-1.06,.5-.31,1.03-.56,1.59-.75,.78-.27,1.59-.4,2.42-.4,2.18,.09,4.28,.84,6.03,2.15,.02,.02,.05,.04,.08,.06,.29,.14,.56,.26,.83,.38,.11,.05,.22,.09,.33,.14,1.24,.56,2.58,.87,3.93,.93m2.3-1.88c-.06,.06-.12,.13-.19,.19-.03,.03-.05,.06-.08,.1-.01,.02-.44,.74-1.97,.75l-.07,.42v-.42c-1.25-.06-2.48-.35-3.62-.87-.11-.04-.21-.08-.31-.13-.24-.1-.5-.22-.76-.35-.54-.41-1.12-.77-1.73-1.07,.19,.06,.3,.1,.32,.1,.05,.01,.1,.02,.15,.01,3.84-.37,6.65,.06,8.26,1.26m-17.91-1.34c-1.39,.62-2.89,.95-4.41,.95-1.6,.01-3.17-.41-4.55-1.21-.04-.02-.07-.04-.11-.05-.32-.12-.6-.31-.83-.55-.07-.07-.15-.15-.23-.24-.59-.76-1.01-1.64-1.2-2.59l-.11-.54c.22-.22,.51-.36,.83-.39,.34,0,.5,.38,.51,.4,.38,.73,.94,1.35,1.63,1.8,.86,.52,1.85,.78,2.85,.75,.1,0,.2,0,.3,0,1.15-.07,2.28-.33,3.33-.78,.04-.02,.08-.04,.11-.08,1.43-1.32,2.71-2.02,3.71-2.02,.53-.02,1.04,.22,1.35,.65,.02,.03,.04,.06,.06,.08,1.25,1.26,2.71,2.31,4.3,3.1-1.88-.64-3.91-.67-5.81-.09-.6,.21-1.18,.48-1.73,.81">
                            </path>
                        </g>
                        <g id="IPR_UL7" ${IPRArray.UL7.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="eb" class="mw" d="M882.54,1210.66s7.61,17.7,1.31,23.71c0,0-1.83,4.65-12.02,1.36,0,0-7.37-3.66-11.83,.14,0,0-5.87,4.98-12.58,.61,0,0-8.92-9.92-.61-30.15,0,0,5.88-11.2,4.58-18.32,0,0-.81-15.74,2.54-20.33,0,0,6.2-11.16,9.67-13.57,0,0,4.58-3.1,5.14,1.92,0,0,.62,1.61-1.73,6.07,0,0-1.36,7-.5,12.21,0,0,1.05,9.48,1.49,10.91,0,0,.5,4.83,2.79,.25,0,0,7.13-14.63,9.36-16.49,0,0,5.95-8.86,7.75-9.61,0,0,12.54-8.12-1.12,16.8,0,0-4.28,8.49-3.66,12.7,0,0,.62,5.46-.74,9.11,0,0-1.39,8.43,.17,12.66">
                            </path>
                            <path id="ec" class="my" d="M870.79,1185.45c-2.29,4.59-2.79-.25-2.79-.25-.43-1.43-1.49-10.91-1.49-10.91-.15-.97-.25-1.95-.27-2.94,2.58-3.04,5.82-6.37,5.82-6.37,4.79-8.32,8.47-7.29,8.47-7.29,3.76,.96,.17,9.48-.47,11.35-2.33,2.16-9.27,16.4-9.27,16.4">
                            </path>
                            <path id="ed" class="mk" d="M845.71,1209.22c.33-.93,.69-1.89,1.09-2.88,.6-1.48,.08-.16,.23-.44,4.31-1.57,9.09-1.19,13.1,1.05,4,2.62,7.07,1.42,7.07,1.42,6.79-2.46,11.74-1.3,14.86,.29,.1,.68,.26,1.35,.49,2,0,0,.13,.3,.34,.84,1.41,3.57,6.45,17.65,.98,22.88,0,0-1.83,4.65-12.02,1.36,0,0-7.37-3.66-11.83,.14,0,0-5.87,4.98-12.58,.61,0,0-8.08-8.98-1.7-27.27">
                            </path>
                            <path id="ee" class="nb" d="M871.86,1235.74c-2.08-.97-4.33-1.51-6.62-1.59-1.89-.07-3.74,.54-5.21,1.73-1.92,1.49-4.26,2.33-6.69,2.4-1.46-1.33,.51-1.52,.51-1.52,2.65-.69,5.15-1.84,7.39-3.41,6.28-5.4,15.81,5.48,20.08,1.84l-1.32,1.58c-.83,.3-.57,.16-1.95,.13-2.11-.09-4.19-.48-6.18-1.17">
                            </path>
                            <path id="ef" class="mx" d="M867.51,1189.82c-1.73,3.13-3,6.49-3.77,9.98-.35,1.76-.55,3.54-.6,5.34-.01,1.08,1.21,3.02,2.3,1.32,.51-.8,.02-2.4,0-3.19-.05-1.82,.1-3.64,.45-5.42,.3-1.82,.76-3.62,1.39-5.36,.25-.74,.53-1.48,.84-2.2,.15-.34-.25-1.11-.62-.48">
                            </path>
                            <path id="eg" class="mx" d="M865.24,1153.43c-.81,.61-1.54,1.33-2.17,2.14-.85,1.02-1.64,2.09-2.39,3.19-1.44,2.08-2.78,4.24-4.06,6.42-.33,.56-.65,1.12-.97,1.69-.35,.56-.65,1.13-.92,1.73-.84,2.35-1.34,4.8-1.47,7.29-.35,3.8-.42,7.63-.23,11.44,.03,.57,.16,1.14,.18,1.72,.03,.8,0,1.6-.09,2.39-.19,1.67-.52,3.32-.99,4.93-.78,2.7-1.77,5.32-2.97,7.86-.13,.28-.27,.56-.41,.84-.08,.17-.13,.37-.32,.42-.48,.12-.95,.27-1.42,.43,1.04-2.11,1.95-4.28,2.71-6.51,1.06-3.08,1.94-6.39,1.82-9.67-.03-.7-.17-1.38-.2-2.08-.03-.65-.04-1.31-.05-1.96-.04-2.36,0-4.72,.14-7.07,.1-2.62,.47-5.23,1.11-7.77,.25-1,.64-1.96,1.16-2.84,.23-.36,.43-.71,.64-1.08,1.11-1.94,2.28-3.85,3.5-5.73,1.35-2.22,2.92-4.29,4.7-6.18,.76-.8,1.73-1.38,2.8-1.65l-.11,.07">
                            </path>
                            <path id="eh" class="nc" d="M846.11,1212.7c-.42,1.83-.74,3.68-.94,5.55-.25,1.92-.31,3.87-.17,5.81,.19,3.18,1.02,6.3,2.42,9.16,.44,.92,.99,1.79,1.64,2.57,.14,.12,.3,.21,.47,.29,.23,.13,.46,.26,.7,.38,.44,.22,.9,.42,1.36,.58,.42,.09,.82,.22,1.21,.39,0,.34,.31,.64,.53,.85-1.92,.02-3.81-.5-5.45-1.5-.35-.19-.65-.47-.88-.81-.44-.62-.84-1.27-1.19-1.95-1.71-3.46-2.58-7.27-2.56-11.12-.05-5.68,1.4-11.17,3.48-16.41,.08-.2,.18-.39,.28-.59,.51-.18,1.02-.33,1.54-.47-.16,.37-.29,.75-.4,1.14-.28,.83-.56,1.65-.84,2.48-.41,1.2-.91,2.41-1.22,3.64h0">
                            </path>
                            <path id="ei" class="nc" d="M860.69,1210.07c-3.03,3.79-2.6,9.29-.48,13.39,.53,1.02,1.15,2,1.84,2.93,.18,.24,.36,.61,.73,.56,.43-.06,.45-.48,.28-.76-1.26-1.97-2.1-4.17-2.48-6.47-.41-2.37,0-4.81,1.18-6.91,.25-.39,.54-.75,.87-1.08,.31-.28,.46-.71,.39-1.12-.19-.72-.92-1.15-1.63-.96-.27,.07-.51,.22-.69,.43">
                            </path>
                            <path id="ej" class="n" d="M853.15,1238.27c2.57-.04,5.06-.92,7.09-2.5,1.39-1.12,3.13-1.7,4.91-1.63,2.24,.08,4.43,.6,6.46,1.54,2.12,.74,4.33,1.16,6.57,1.22h0c4.42,0,5.74-2.22,5.98-2.71,6.33-6.19-.96-23.39-1.28-24.13-1.49-4.07-.15-12.35-.14-12.43,1.36-3.63,.77-9,.75-9.23-.59-4.05,3.57-12.38,3.62-12.47,5.34-9.75,7.32-15.55,6.03-17.72-.38-.63-1.08-1-1.82-.95-1.63,0-3.62,1.28-3.7,1.33-1.77,.73-7.08,8.56-7.84,9.68-2.32,2.05-9.13,15.99-9.42,16.58-.86,1.72-1.3,1.74-1.32,1.74-.24,0-.58-.93-.68-1.85-.35-1.18-1.13-7.64-1.49-10.91-.81-4.84,.35-11.34,.48-12.02,2.18-4.15,1.86-5.93,1.75-6.3-.31-2.64-1.7-3.2-2.81-3.2-1.06,.08-2.09,.43-2.98,1.02-3.52,2.45-9.55,13.25-9.8,13.71-3.37,4.61-2.63,19.9-2.59,20.55,1.27,6.96-4.47,18-4.53,18.11-8.33,20.27,.58,30.52,.67,30.62,.02,.03,.05,.05,.08,.08,1.77,1.2,3.86,1.84,5.99,1.86m12-4.97c-1.98-.07-3.92,.58-5.45,1.83-1.88,1.44-4.18,2.25-6.55,2.31-1.95-.02-3.86-.61-5.49-1.69-.58-.7-8.35-10.58-.5-29.67,.23-.43,5.91-11.37,4.6-18.56,0-.1-.75-15.59,2.47-20.01,.09-.15,6.22-11.14,9.57-13.48,.75-.49,1.61-.79,2.51-.87,1.15,0,1.79,.82,1.98,2.49,0,.04,.01,.07,.03,.11,0,0,.48,1.57-1.71,5.73-.02,.04-.03,.07-.04,.11-.06,.29-1.37,7.14-.5,12.36,.04,.37,1.06,9.51,1.5,10.96,.05,.53,.34,2.52,1.49,2.52,.67,0,1.31-.68,2.07-2.21,2.45-5.03,7.54-14.93,9.25-16.35,.03-.03,.06-.06,.08-.09,2.36-3.52,6.33-8.94,7.56-9.45,.08-.05,1.93-1.23,3.31-1.23,.44-.04,.86,.16,1.1,.54,.62,1.05,.66,4.64-6.05,16.91-.18,.36-4.33,8.67-3.7,12.97,0,.04,.59,5.39-.72,8.9-.08,.43-1.41,8.66,.17,12.95,.08,.2,7.43,17.53,1.42,23.27-.04,.04-.08,.09-.1,.15-.04,.09-.99,2.27-5.24,2.27-2.13-.06-4.25-.45-6.26-1.16-2.13-.99-4.43-1.54-6.78-1.61">
                            </path>
                            <path id="ek" class="n" d="M869.06,1187.41h0c.67,0,1.31-.68,2.07-2.21,.07-.15,6.93-14.2,9.18-16.29,.05-.05,.09-.11,.11-.17,.06-.18,.15-.42,.26-.72,.9-2.44,2.77-7.5,1.49-9.93-.32-.63-.89-1.08-1.57-1.24-.12-.04-4.01-1.05-8.91,7.44-.37,.38-3.39,3.51-5.8,6.35-.07,.08-.1,.18-.1,.28,.03,1,.12,2,.28,2.99,.04,.37,1.06,9.52,1.5,10.96,.05,.53,.34,2.52,1.49,2.52m10.6-19.03c-2.42,2.41-9,15.88-9.28,16.46-.86,1.72-1.3,1.74-1.32,1.74-.24,0-.58-.93-.68-1.85-.35-1.18-1.13-7.64-1.49-10.91-.15-.91-.23-1.83-.26-2.74,2.52-2.96,5.66-6.19,5.69-6.22,.02-.03,.04-.05,.06-.08,3.8-6.61,6.85-7.12,7.69-7.12,.1,0,.21,0,.31,.03,.45,.1,.84,.4,1.04,.82,1.1,2.1-.75,7.11-1.54,9.25-.09,.25-.17,.47-.23,.64">
                            </path>
                            <path id="el" class="n" d="M853.15,1238.27h0c2.57-.04,5.06-.92,7.09-2.5,1.39-1.12,3.13-1.7,4.91-1.63,2.24,.08,4.43,.6,6.46,1.54,2.12,.74,4.33,1.16,6.58,1.22,4.42,0,5.74-2.22,5.98-2.71,5.5-5.39,.68-19.17-.93-23.28-.21-.54-.34-.85-.34-.85-.21-.62-.37-1.25-.46-1.9-.02-.13-.1-.25-.23-.31-4.34-2.21-9.6-2.33-15.19-.31-.56,.18-1.14,.26-1.72,.25-1.78-.04-3.51-.61-4.98-1.63-2.41-1.38-5.15-2.1-7.92-2.07-1.89,0-3.76,.33-5.54,.97-.1,.04-.19,.11-.23,.21-.14,.28-.22,.43-.22,.43-.41,.99-.78,1.97-1.12,2.93-6.38,18.31,1.45,27.31,1.79,27.69,.02,.03,.05,.05,.08,.08,1.77,1.2,3.86,1.84,5.99,1.86m12-4.97c-1.98-.07-3.92,.58-5.45,1.83-1.88,1.44-4.18,2.25-6.55,2.31-1.95-.02-3.86-.61-5.49-1.69-.55-.66-7.59-9.6-1.59-26.81,.33-.95,.7-1.91,1.08-2.86,0,0,.05-.1,.14-.27,1.64-.57,3.36-.86,5.1-.87,2.62-.02,5.19,.65,7.47,1.94,1.6,1.11,3.49,1.72,5.43,1.76,.68,.02,1.37-.09,2.02-.3,5.27-1.91,10.23-1.84,14.33,.18,.1,.63,.26,1.26,.48,1.86,0,.02,.14,.32,.34,.84,1.12,2.85,6.43,17.3,1.08,22.42-.04,.04-.08,.09-.1,.15-.04,.09-.99,2.27-5.24,2.27-2.13-.06-4.25-.45-6.26-1.16-2.13-1-4.43-1.54-6.78-1.61">
                            </path>
                            <path id="em" class="n" d="M853.31,1238.27h0c2.53-.07,4.96-.95,6.96-2.5,1.39-1.12,3.13-1.7,4.91-1.63,2.24,.08,4.43,.6,6.46,1.54,2.05,.71,4.19,1.12,6.36,1.22,.42,0,.68,.02,.87,.04,.42,.05,.85-.02,1.23-.2,.07-.03,.13-.07,.18-.13l1.32-1.58c.15-.18,.13-.44-.05-.59-.16-.13-.39-.13-.55,0-.55,.45-1.24,.69-1.95,.66h0c-1.62,0-3.66-.89-5.81-1.84-2.58-1.13-5.24-2.3-7.81-2.3-1.65-.03-3.25,.55-4.49,1.64-2.19,1.52-4.63,2.64-7.21,3.32-.14,0-1.11,.14-1.33,.81-.14,.43,.07,.91,.63,1.42,.08,.07,.18,.11,.28,.11m11.91-4.97c-1.99-.08-3.94,.57-5.49,1.83-1.8,1.38-3.98,2.19-6.25,2.3-.29-.29-.28-.43-.28-.43,.19-.16,.43-.24,.67-.25,2.72-.69,5.29-1.88,7.59-3.49,1.1-.96,2.52-1.48,3.98-1.45,2.4,0,4.98,1.13,7.48,2.22,2.24,.98,4.36,1.91,6.15,1.91h0c.25,0,.5-.02,.74-.06l-.09,.1c-.24,.12-.52,.16-.79,.11-.2-.01-.48-.03-.91-.04-2.06-.09-4.1-.48-6.06-1.15-2.11-.99-4.41-1.54-6.75-1.61">
                            </path>
                        </g>
                        <g id="IPR_UL4" ${IPRArray.UL4.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="en" class="mw" d="M715.49,1234.22s13.58-3.12,2.78-25.14c0,0-3.37-15.52-2.78-18.39,0,0-.48-10.55-.07-12.99,0,0,1.66-19.27,.08-21.61,0,0-2.12-3.49-2.77,2.95,0,0-1.29-13.82-4.92-8.93,0,0-4.3,8.69-5.49,25.65,0,0-1.81,10.21-1.92,12.51,0,0-.95,7.59-.88,9.63,0,0-1.68,9.41-2.77,11.53-2.13,4.21-3.31,8.83-3.47,13.54,0,0-1.17,6.86,3.1,8.72,1.27,.44,2.4,1.21,3.28,2.23,0,0,7.21,9.64,15.81,.31">
                            </path>
                            <path id="eo" class="mk" d="M696.4,1231.68c1.27,.44,2.4,1.21,3.28,2.23,0,0,7.21,9.64,15.81,.31,0,0,12.43-2.86,4.05-22.38-.38-.89-.8-1.81-1.27-2.76-.7-1.43-.03-.12-.08-.34-4.4-4.36-12.32-10.32-21.77,1.37-.27,.56-.66,1.43-1.08,2.55-1.26,3.3-1.95,6.79-2.05,10.31,0,0-1.17,6.86,3.1,8.72">
                            </path>
                            <path id="ep" class="mx" d="M709.72,1149.16c-.24,.38-.44,.78-.6,1.2-1.67,4.27-2.89,8.7-3.63,13.22-.34,1.88-.62,3.76-.85,5.65-.13,1.06-.24,2.12-.34,3.17-.08,.85-.06,1.75-.21,2.59-.3,1.71-.59,3.42-.88,5.14-.66,3.99-1.15,7.99-1.57,12.01-.13,1.26-.25,2.53-.32,3.8,0,.55-.04,1.1-.11,1.65-.41,2.2-.84,4.41-1.35,6.59-.24,1.03-.49,2.06-.8,3.06-.93,.88-1.8,1.82-2.6,2.82,.21-.44,.34-.68,.34-.68,1.09-2.12,2.77-11.53,2.77-11.53-.08-2.04,.88-9.63,.88-9.63,.1-2.3,1.91-12.51,1.91-12.51,1.18-16.96,5.49-25.65,5.49-25.65,.24-.36,.56-.66,.93-.89,.29-.16,.65-.17,.95-.02">
                            </path>
                            <path id="eq" class="nc" d="M699.08,1207.19c-.04,.12-.08,.25-.11,.37-.33,1-.86,1.91-1.28,2.88-1.61,3.69-2.5,7.67-2.6,11.7-.51,3.13-.03,7.49,3.33,8.8,1.26,.49,2.36,1.3,3.21,2.34,.62,.74,1.32,1.41,2.08,2,2.26,1.9,5.31,2.58,8.16,1.82-.17,.09-.34,.18-.52,.26-.11,.05-.22,.1-.33,.15-.05,.02-.11,.05-.16,.07-.68,.28-1.39,.47-2.11,.56-.03,0-.06,0-.1,.01-.08,0-.17,.02-.25,.03h-.17c-.13,.02-.26,.02-.39,.02h-.08c-.17,0-.35,0-.52-.02h-.06c-.17-.01-.33-.03-.49-.05l-.13-.02c-.1-.02-.2-.03-.31-.05-3.52-.68-5.97-3.54-6.45-4.12-.05-.07-.08-.11-.08-.11-.88-1.02-2.01-1.78-3.28-2.23-.26-.11-.51-.25-.74-.4-3.39-2.29-2.36-8.31-2.36-8.31,0-.08,0-.15,0-.23,0-.16,0-.32,.01-.49,0-.1,.01-.2,.02-.3,0-.14,.02-.28,.03-.42,0-.1,.02-.2,.02-.3,.01-.14,.02-.28,.04-.41,0-.1,.02-.2,.03-.3,.01-.14,.03-.27,.05-.41,.01-.1,.02-.19,.04-.29,.02-.13,.04-.27,.06-.4,.01-.09,.03-.19,.04-.28,.02-.14,.04-.27,.07-.4,.02-.09,.03-.18,.05-.27,.02-.14,.05-.27,.08-.41,.02-.08,.03-.16,.05-.24,.03-.14,.06-.28,.09-.42,.02-.07,.03-.14,.05-.21,.04-.17,.08-.33,.12-.5,0-.04,.02-.08,.03-.12,.05-.2,.1-.4,.15-.59,.02-.09,.05-.18,.08-.27s.05-.2,.08-.3,.06-.21,.09-.32c.02-.08,.05-.15,.07-.23,.04-.12,.07-.23,.11-.34,.02-.06,.04-.11,.05-.17,.04-.12,.08-.25,.12-.37,.01-.04,.03-.08,.04-.12,.05-.14,.09-.27,.14-.4l.02-.05c.39-1.12,.84-2.22,1.34-3.29,.8-1,1.67-1.94,2.6-2.82">
                            </path>
                            <path id="er" class="nc" d="M714.19,1207.48c.25,1.22,.74,2.27,1.09,3.43,.44,1.49,.66,3.04,.66,4.6-.05,2.78-.37,5.55-.96,8.28-.32,1.68-.73,3.38-1.17,5.07-.17,.65-.34,1.31-.51,1.96-.16,.6-.88,.94-1.03,.37-.01-.46,.06-.91,.2-1.35,.17-.83,.35-1.67,.48-2.5,.28-1.69,.57-3.38,.74-5.05,.35-3.4,.47-6.87-.62-9.64-.31-.78-.71-1.48-1.02-2.25-.28-.54-.45-1.13-.5-1.73,0-1.75,2.3-2.78,2.63-1.19">
                            </path>
                            <path id="es" class="n" d="M707.72,1238.7c2.76,0,5.44-1.38,7.99-4.11,2.64-.82,4.81-2.71,5.97-5.22,2.29-4.8,1.28-11.68-3.01-20.43-1.16-5.36-3.22-15.98-2.77-18.17,0-.03,0-.07,0-.1,0-.11-.47-10.53-.08-12.91,.18-2.02,1.63-19.52,.01-21.91-.06-.1-.71-1.13-1.56-1.13-.64,0-1.13,.51-1.47,1.57-.49-3.15-1.53-7.66-3.51-7.66-.77,.09-1.44,.54-1.82,1.22-.08,.15-4.39,9.02-5.56,25.87-.07,.38-1.81,10.22-1.92,12.52-.04,.28-.94,7.51-.88,9.62-.12,.69-1.71,9.4-2.72,11.37-2.17,4.26-3.37,8.94-3.51,13.72-.04,.23-1.16,7.14,3.35,9.11,1.2,.42,2.28,1.15,3.12,2.1,.13,.18,3.45,4.54,8.37,4.54m7.34-48.04c-.55,3.05,2.66,17.88,2.8,18.51,0,.03,.02,.06,.03,.09,4.19,8.54,5.21,15.18,3.03,19.75-1.08,2.31-3.09,4.05-5.53,4.8-.08,.02-.16,.06-.21,.12-2.4,2.61-4.91,3.93-7.46,3.93-4.5,0-7.68-4.17-7.71-4.21-.93-1.09-2.14-1.9-3.49-2.37-3.88-1.69-2.83-8.19-2.82-8.25,.16-4.66,1.33-9.24,3.42-13.41,1.12-2.15,2.75-11.27,2.82-11.66,0-.03,0-.06,0-.09-.07-1.99,.86-9.49,.87-9.57,.11-2.28,1.9-12.39,1.91-12.49,1.17-16.7,5.4-25.45,5.45-25.53,.39-.51,.78-.82,1.11-.82,1.46,0,2.65,5.61,3.02,9.6,.02,.21,.2,.38,.42,.38h0c.21,0,.4-.16,.42-.38,.34-3.42,1.06-3.52,1.14-3.52,.29,0,.7,.48,.86,.74,1.11,1.64,.53,13.67-.14,21.35-.4,2.37,.03,12.12,.07,13">
                            </path>
                            <path id="et" class="n" d="M707.72,1238.7c2.76,0,5.44-1.38,7.99-4.11,2.55-.79,4.66-2.59,5.85-4.98,2.18-4.29,1.63-10.33-1.64-17.94-.36-.85-.79-1.77-1.26-2.74l-.07-.3c-.02-.08-.06-.15-.11-.2-2.41-2.39-6.16-5.57-10.8-5.57-3.95,0-7.86,2.35-11.6,6.97-.02,.03-.04,.05-.05,.08-.26,.54-.66,1.43-1.09,2.58-1.27,3.34-1.97,6.88-2.08,10.45-.04,.23-1.17,7.14,3.35,9.11,1.2,.42,2.28,1.15,3.12,2.1,.13,.18,3.45,4.54,8.37,4.54m10.09-29.76l.05,.22s.02,.07,.03,.1c.47,.96,.9,1.89,1.26,2.74,3.16,7.36,3.72,13.15,1.67,17.22-1.11,2.21-3.07,3.87-5.43,4.59-.08,.02-.16,.06-.21,.12-2.4,2.61-4.91,3.93-7.46,3.93-4.51,0-7.68-4.17-7.71-4.21-.93-1.09-2.14-1.91-3.49-2.37-3.88-1.7-2.83-8.18-2.82-8.25,.1-3.5,.79-6.96,2.03-10.24,.41-1.09,.79-1.93,1.04-2.47,3.57-4.4,7.24-6.63,10.92-6.63,4.27,0,7.81,2.97,10.12,5.24">
                            </path>
                        </g>
                        <g id="IPR_UL5" ${IPRArray.UL5.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="eu" class="mw" d="M741.85,1233.14c8.17,10.16,13.2,2.14,13.2,2.14,10.35-1.27,6.76-15.69,6.76-15.69,.1-1.33-.56-3.79-1.1-5.55-.37-1.19-.68-2.06-.68-2.06,0-.24-.02-.55-.04-.91-.16-2.95-.74-9.51-.81-9.78-.08-.3,.2-15.52,.2-15.52,.33-3.09-.97-11.61-.97-11.61-.2-.57,.03-5.99,.03-5.99,.2-1.54,.26-3.1,.18-4.66,1.2-4.82-1.33-5.56-1.33-5.56-3.41-1.77-4.55,1.35-4.55,1.35-3.54,7.06-9.98,40.86-9.98,40.86-.66,2.81-1.76,6.86-2.77,10.48-.36,1.3-.72,2.55-1.03,3.65-.75,2.63-1.3,4.51-1.33,4.61-1.89,7.12,4.23,14.23,4.23,14.23">
                            </path>
                            <path id="ev" class="mk" d="M741.85,1233.14c8.17,10.16,13.2,2.14,13.2,2.14,10.35-1.27,6.76-15.69,6.76-15.69,.1-1.33-.56-3.79-1.1-5.55-.37-1.19-.68-2.06-.68-2.06,0-.24-.02-.55-.04-.91-4.04-4.32-12.45-10.8-20.01-.42-.36,1.3-.72,2.55-1.03,3.65-.75,2.63-1.3,4.51-1.33,4.61-1.89,7.12,4.23,14.23,4.23,14.23">
                            </path>
                            <path id="ew" class="mk" d="M741.84,1233.14c.15,.19,.31,.38,.46,.56-.15-.18-.31-.36-.46-.56,0,0-4.68-5.44-4.59-11.58-.09,6.13,4.59,11.57,4.59,11.57">
                            </path>
                            <path id="ex" class="mk" d="M742.8,1234.26c.13,.15,.26,.29,.39,.42-.13-.14-.26-.28-.39-.42"></path>
                            <path id="ey" class="mk" d="M742.32,1233.72c.14,.17,.28,.32,.42,.48-.14-.15-.28-.31-.42-.48"></path>
                            <path id="f" class="mw" d="M742.74,1234.19s.04,.04,.06,.07c-.02-.02-.04-.04-.06-.07"></path>
                            <path id="fa" class="mw" d="M742.3,1233.69l.02,.02-.02-.02"></path>
                            <path id="fb" class="mw" d="M742.75,1200.16c-.66,2.81-1.76,6.86-2.77,10.48-.36,1.3-.72,2.54-1.03,3.65-.75,2.63-1.31,4.51-1.33,4.61-.23,.87-.35,1.76-.36,2.66,.01-.9,.13-1.79,.36-2.66,.03-.1,.58-1.98,1.33-4.61,.32-1.11,.67-2.35,1.03-3.65,1.01-3.62,2.11-7.67,2.77-10.48,0,0,6.44-33.8,9.98-40.86,0,0,.03-.08,.09-.19-.03,.06-.06,.13-.09,.2-3.54,7.06-9.98,40.86-9.98,40.86">
                            </path>
                            <path id="fc" class="mx" d="M744.53,1199.39c-.54,2.33-1.4,5.52-2.25,8.6-.85,.81-1.63,1.69-2.31,2.65,1.01-3.62,2.11-7.67,2.77-10.48,0,0,6.44-33.8,9.98-40.86,.03-.07,.05-.13,.09-.2v-.03s.05-.06,.07-.1l.04-.08s.02-.03,.03-.05c.02-.04,.05-.08,.08-.13,0-.01,.02-.02,.02-.03,.03-.04,.06-.09,.09-.13l.02-.03c.04-.05,.08-.11,.13-.16l.02-.02c.05-.05,.1-.11,.15-.16h0c.05-.06,.11-.11,.18-.17l.02-.02c.13-.11,.27-.21,.42-.29h.03c.16-.1,.33-.17,.51-.22h.04c.2-.06,.4-.09,.6-.1,0,0,.02,0,.03,0-.32,.32-.58,.7-.75,1.13-3.54,7.06-9.98,40.86-9.98,40.86">
                            </path>
                            <path id="fd" class="nc" d="M737.25,1221.56c.01-.9,.13-1.79,.36-2.66,.02-.1,.58-1.98,1.33-4.61,.32-1.11,.67-2.35,1.03-3.65,.68-.95,1.46-1.84,2.31-2.65-.18,.63-.35,1.26-.53,1.88-.36,1.3-.72,2.54-1.03,3.65-.75,2.63-1.31,4.51-1.33,4.61-1.89,7.12,4.23,14.23,4.23,14.23,3.85,4.78,7,5.54,9.26,4.99-1.32,.86-2.94,1.13-4.48,.75h0c-.11-.03-.23-.06-.35-.1h0c-.38-.12-.75-.26-1.1-.43h0c-.12-.06-.24-.12-.36-.19,0,0-.02-.01-.03-.02-.12-.07-.25-.14-.38-.22h0c-.42-.25-.82-.53-1.2-.84-.01-.01-.03-.02-.04-.03-.12-.1-.25-.2-.38-.31-.01-.01-.02-.02-.04-.03-.42-.36-.84-.76-1.28-1.22-.01-.01-.03-.03-.04-.05-.13-.14-.26-.28-.39-.42-.02-.02-.04-.04-.06-.07-.14-.15-.28-.31-.42-.48l-.02-.02c-.15-.18-.31-.37-.46-.56,0,0-4.68-5.44-4.59-11.57">
                            </path>
                            <path id="fe" class="nc" d="M756.43,1210.1c.14,.95,.45,1.79,.66,2.71,.26,1.18,.36,2.38,.28,3.58-.16,2.14-.53,4.26-1.09,6.33-.32,1.28-.7,2.57-1.11,3.84-.16,.49-.32,.99-.47,1.48-.15,.46-.7,.68-.79,.23,.01-.35,.08-.7,.21-1.03,.16-.63,.34-1.27,.48-1.9,.29-1.29,.58-2.57,.78-3.85,.41-2.6,.67-5.27-.03-7.46-.2-.62-.47-1.18-.67-1.79-.18-.43-.29-.89-.3-1.36,.09-1.35,1.85-2.02,2.03-.77">
                            </path>
                            <path id="ff" class="n" d="M749.83,1238.7c3.1,0,5-2.37,5.47-3.03,2.28-.23,4.35-1.44,5.66-3.32,3.13-4.55,1.48-11.97,1.28-12.79,.08-1.39-.57-3.83-1.13-5.64-.31-1.01-.59-1.79-.66-2.01,0-.23-.02-.52-.03-.86-.15-2.86-.74-9.53-.83-9.87-.04-.45,.1-9.47,.22-15.4,.32-3.07-.92-11.33-.98-11.68-.11-1.97-.1-3.94,.04-5.9,.2-1.54,.26-3.09,.18-4.63,1.25-5.1-1.51-5.97-1.63-6.01-.63-.35-1.34-.54-2.06-.56-1.35,.05-2.53,.91-3.01,2.17-3.51,6.99-9.74,39.54-10,40.92-.54,2.32-1.47,5.84-2.76,10.44-.36,1.3-.72,2.54-1.03,3.65-.47,1.63-.86,2.98-1.09,3.79-.15,.5-.23,.8-.24,.84-1.92,7.25,4.06,14.31,4.32,14.61,2.82,3.51,5.61,5.29,8.29,5.29m5.52-80.88c.61,.02,1.21,.19,1.75,.49,.16,.06,2.19,.77,1.12,5.09-.01,.04-.01,.08-.01,.12,.08,1.52,.02,3.05-.18,4.57-.06,1.34-.23,5.6-.01,6.19,0,0,1.26,8.43,.95,11.42-.13,7.01-.27,15.38-.19,15.68,.07,.35,.64,6.63,.8,9.69,.02,.36,.03,.67,.04,.9,0,.05,.01,.09,.03,.13,0,0,.31,.86,.68,2.04,.63,1.74,1,3.56,1.09,5.4,0,.04,0,.09,.01,.13,.02,.08,1.89,7.77-1.15,12.18-1.22,1.73-3.15,2.83-5.26,2.99-.12,.02-.23,.09-.3,.19-.02,.03-1.81,2.81-4.87,2.81-2.42,0-4.99-1.68-7.65-4.99-.07-.08-5.96-7.04-4.15-13.86,.01-.05,.1-.34,.23-.81,.23-.81,.63-2.16,1.09-3.79,.32-1.11,.67-2.35,1.04-3.66,1.29-4.62,2.23-8.15,2.77-10.5,.07-.35,6.47-33.84,9.95-40.77,.34-.95,1.23-1.61,2.24-1.67">
                            </path>
                            <path id="fg" class="n" d="M749.83,1238.7c3.1,0,5-2.37,5.47-3.03,2.28-.23,4.35-1.44,5.66-3.32,3.13-4.55,1.48-11.97,1.28-12.79,.08-1.39-.57-3.83-1.13-5.64-.31-1.01-.58-1.79-.66-2.01,0-.23-.02-.53-.03-.86,0-.1-.05-.19-.11-.26-2.61-2.8-6.69-6.13-11.25-6.13-3.46,0-6.62,1.93-9.4,5.75-.03,.04-.05,.08-.06,.13-.36,1.3-.72,2.54-1.03,3.65-.47,1.63-.86,2.98-1.09,3.79-.15,.5-.23,.8-.24,.84-1.92,7.25,4.06,14.31,4.32,14.61,2.82,3.51,5.61,5.29,8.29,5.29m9.75-27.46c.01,.3,.02,.55,.03,.75,0,.05,0,.09,.03,.13,0,0,.31,.86,.68,2.04,.63,1.74,1,3.56,1.09,5.4,0,.04,0,.09,.01,.13,.02,.08,1.89,7.77-1.15,12.18-1.22,1.73-3.15,2.83-5.26,2.99-.12,.02-.23,.09-.3,.19-.02,.03-1.81,2.81-4.87,2.81-2.42,0-4.99-1.68-7.65-4.99-.07-.08-5.96-7.04-4.15-13.86,.01-.05,.1-.34,.23-.81,.24-.81,.63-2.15,1.09-3.79,.31-1.09,.66-2.31,1.01-3.58,2.6-3.55,5.52-5.35,8.68-5.35,4.2,0,8.03,3.1,10.53,5.76">
                            </path>
                        </g>
                        <g id="IPR_UL2" ${IPRArray.UL2.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="fh" class="mw" d="M633.27,1212.69s-4.79-12.76-5.12-19.14c0,0,.33-15.37-1.77-22.11,0,0-2.31-8.97-2.64-11.82,0,0-.7-13.97-5.43-3.32-.47,2.39-.62,4.84-.46,7.27,0,0-.8,9.34-.83,11.85,0,0-2.31,18.22-2.78,27.02,0,0-2.43,15.24-2.79,19.91l.05,.31s-1.52,8.8-.9,11.38c0,0-.83,4.81,7.31,4.01,0,0,3.73,1.14,8.41-1.65,0,0,4.48-.91,7.12-3.24,0,0,8.07-3.38-.17-20.46">
                            </path>
                            <path id="fi" class="mk" d="M617.91,1238.05s3.73,1.14,8.41-1.65c0,0,4.48-.91,7.12-3.24,0,0,7.74-3.25,.31-19.44-.16-.34-.31-.68-.48-1.03,0,0-.85-2.25-1.85-5.34-3.99-5.25-10.55-10.21-17.81-.87l-.4,2.65c-.71,4.71-1.55,10.62-1.75,13.22l.05,.32s-1.53,8.8-.9,11.37c0,0-.83,4.82,7.31,4.01">
                            </path>
                            <path id="fj" class="mx" d="M620.75,1154.17c-.25,.41-.46,.85-.63,1.3-.15,.57-.25,1.15-.3,1.73-.16,1.14-.26,2.29-.28,3.44-.01,.55,0,1.1,.04,1.64,.03,.6,.01,1.19-.05,1.79-.1,1.18-.19,2.36-.29,3.54-.18,2.35-.29,4.7-.48,7.05-.19,2.35-.54,4.68-.81,7.01-.51,4.33-.98,8.66-1.39,13-.2,2.15-.35,4.3-.52,6.45-.04,.51-.09,1.02-.16,1.54-.04,.28-.08,.56-.12,.84-.03,.23-.02,.61-.19,.78-.7,.68-1.36,1.41-1.95,2.19,.2-1.15,.39-2.31,.53-3.47,.1-.91,.15-1.82,.22-2.74,.16-2.25,.37-4.51,.59-6.76,.44-4.5,.95-8.99,1.49-13.47,.2-1.69,.51-3.39,.57-5.09,.08-2.14,.25-4.28,.42-6.41,.08-1.09,.17-2.17,.26-3.26,.04-.51,.08-1.02,.13-1.53,0-.47-.02-.94-.08-1.41-.02-1,.02-2,.12-3,.06-1.02,.21-2.04,.44-3.04,.41-.99,.92-1.93,1.53-2.81,.41-.56,1.19-1.51,1.98-1.02-.41,.54-.77,1.11-1.07,1.72-.25,.47,.29-.55,0,0">
                            </path>
                            <path id="fk" class="nc" d="M610.45,1232.21c.05-2.13,.24-4.26,.57-6.36,.11-.83,.24-1.66,.37-2.49,.08-.32,.1-.66,.07-.99-.01-.47,.03-.95,.13-1.41,.06-.55,.13-1.11,.19-1.66,.13-1.07,.27-2.14,.42-3.21,.3-2.18,.61-4.36,.94-6.54,.16-1.03,.32-2.07,.49-3.1,.62-.81,1.3-1.57,2.04-2.27-.69,4.28-1.37,8.56-1.92,12.86-.14,1.07-.27,2.13-.39,3.2-.1,.48-.14,.96-.12,1.45,.02,.52-.04,1.03-.18,1.53-.31,1.92-.54,3.84-.72,5.78,.03-.31,.06-.62,.09-.93-.11,1.05-.19,2.1-.21,3.16-.04,.53-.01,1.06,.08,1.58,.1,.44,.01,.88,.08,1.33,.26,1.37,1.28,2.46,2.63,2.82,1.38,.4,2.83,.53,4.26,.37,.5,0,.99,.05,1.48,.15,.54,.05,1.08,.06,1.62,.02,1.07-.07,2.12-.29,3.13-.65-1.61,.85-3.39,1.34-5.21,1.43-.79,.05-1.59-.02-2.36-.21-.12-.01-.24,0-.36,.02-.24,.02-.49,.04-.73,.05-.43,.02-.85,.02-1.28,0-1.54-.08-3.33-.43-4.32-1.72-.43-.56-.67-1.25-.68-1.96,.01-.31,0-.63-.06-.94-.06-.43-.09-.86-.07-1.3h0">
                            </path>
                            <path id="fl" class="nc" d="M630.26,1229.8c.11-1.13,.45-2.12,.67-3.2,.26-1.39,.31-2.82,.14-4.22-.34-2.52-.92-5-1.75-7.41-.48-1.5-1.03-3-1.62-4.48l-.68-1.73c-.21-.53-.92-.77-1-.24,.04,.42,.15,.82,.33,1.2,.24,.74,.5,1.48,.71,2.22,.44,1.5,.88,3.01,1.22,4.51,.68,3.05,1.15,6.18,.41,8.78-.21,.73-.51,1.4-.72,2.13-.2,.51-.3,1.06-.29,1.61,.19,1.58,2.44,2.31,2.59,.84">
                            </path>
                            <path id="fm" class="n" d="M619.93,1238.7c2.32-.04,4.58-.69,6.55-1.91,.61-.13,4.65-1.06,7.2-3.28,1.44-.8,2.53-2.12,3.04-3.68,1.06-2.8,1.39-8.08-3.07-17.32-.03-.09-4.76-12.74-5.08-18.98,.01-.6,.31-15.49-1.78-22.21-.02-.07-2.3-8.95-2.63-11.74-.06-1.26-.5-7.69-2.78-7.69-1.06,0-2.16,1.35-3.45,4.25-.01,.03-.02,.06-.03,.09-.48,2.42-.64,4.89-.47,7.36-.07,.77-.8,9.4-.83,11.84-.02,.14-2.32,18.29-2.78,27.01-.02,.11-2.43,15.27-2.79,19.9,0,.03,0,.06,0,.09l.04,.25c-.15,.87-1.47,8.78-.9,11.4-.09,.98,.21,1.97,.84,2.73,1.21,1.43,3.52,2,6.85,1.69,.67,.16,1.36,.24,2.05,.23m1.46-85.98c.99,0,1.78,3.59,1.94,6.93,.34,2.87,2.56,11.53,2.66,11.9,2.06,6.61,1.76,21.85,1.75,22,.32,6.4,4.95,18.77,5.15,19.29,4.33,8.97,4.05,14.01,3.07,16.65-.44,1.39-1.39,2.56-2.67,3.28-.04,.02-.08,.04-.11,.08-2.53,2.23-6.89,3.13-6.93,3.14-.05,0-.09,.03-.13,.05-1.86,1.16-3.99,1.79-6.18,1.83-.64,.01-1.27-.06-1.89-.21-.05-.02-.11-.02-.16-.02-3.07,.3-5.18-.17-6.21-1.39-.5-.59-.73-1.37-.65-2.14,0-.06,0-.11,0-.17-.6-2.46,.89-11.12,.91-11.21,0-.04,0-.09,0-.13l-.04-.27c.37-4.65,2.76-19.67,2.78-19.82,.47-8.73,2.76-26.85,2.79-27.04,.03-2.51,.83-11.77,.83-11.86,0-.03,0-.06,0-.09-.16-2.37-.01-4.76,.44-7.09,1.49-3.35,2.36-3.71,2.66-3.71">
                            </path>
                            <path id="fn" class="n" d="M619.93,1238.7c2.31-.03,4.58-.69,6.55-1.9,.61-.13,4.65-1.07,7.2-3.28,1.42-.79,2.49-2.07,3.01-3.61,1.04-2.67,1.44-7.67-2.55-16.37-.16-.34-.32-.68-.49-1.03,0,0-.85-2.25-1.83-5.29-.02-.04-.04-.09-.06-.12-6.08-7.98-12.65-8.37-18.47-.87-.04,.06-.07,.12-.08,.19l-.4,2.65c-.69,4.59-1.56,10.62-1.76,13.25,0,.03,0,.06,0,.09l.04,.25c-.15,.87-1.47,8.78-.9,11.4-.09,.98,.21,1.97,.84,2.73,1.21,1.43,3.52,2,6.85,1.69,.67,.16,1.36,.23,2.05,.23m11.12-31.15c.99,3.03,1.83,5.27,1.84,5.29,.18,.38,.34,.72,.49,1.05,3.87,8.42,3.51,13.19,2.53,15.71-.44,1.35-1.38,2.48-2.62,3.17-.04,.02-.08,.04-.11,.08-2.53,2.23-6.88,3.13-6.93,3.14-.05,0-.09,.03-.13,.05-1.86,1.16-3.99,1.79-6.18,1.82-.64,.01-1.27-.06-1.89-.21-.05-.01-.11-.02-.16-.02-3.05,.3-5.17-.17-6.2-1.38-.5-.6-.74-1.37-.66-2.15,0-.06,0-.11,0-.17-.6-2.46,.89-11.12,.91-11.2,0-.04,0-.09,0-.13l-.04-.27c.21-2.63,1.06-8.59,1.75-13.15l.39-2.54c2.6-3.31,5.29-4.99,8.01-4.99,3.73,0,6.96,3.19,9.02,5.89">
                            </path>
                        </g>
                        <g id="IPR_UL1" ${IPRArray.UL1.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="fo" class="mw" d="M570.09,1238.21s16.91,0,26.77-5.23c0,0,.8,.24,1.03-4.36,0,0,1.61-16.76-3.69-27.13h0c.6-8.65,.14-17.34-1.38-25.87,0,0-2.08-15.21-2.23-18.85,0,0-.83-18.02-9.1-5.28,0,0-6.12,10.84-8.32,19.16,0,0-7.8,21.67-5.09,36.84h0c-.46,1.9-.81,3.83-1.04,5.78-2.14,17.38-1.65,14.43-1.99,19.67,0,0-.56,5.85,5.03,5.28">
                            </path>
                            <path id="fp" class="mk" d="M597.98,1228.62s3.54-36.72-17.07-35.11c0,0-11.18-1.38-13.78,19.76-2.14,17.39-1.65,14.43-1.99,19.67,0,0-.56,5.85,5.03,5.28,0,0,16.91,0,26.77-5.23,0,0,.81,.24,1.03-4.36">
                            </path>
                            <path id="fq" class="mx" d="M573.17,1170.64c2.2-8.32,8.32-19.16,8.32-19.16,1.75-2.69,3.16-4.01,4.31-4.41,.22-.08,.45-.13,.68-.14-1.27,1.08-2.35,2.36-3.2,3.79,0,0-6.12,10.84-8.32,19.16,0,0-8.3,18.52-5.59,33.69,0,0-1.18,3.66-1.29,3.92-2.7-15.17,5.1-36.85,5.1-36.85">
                            </path>
                            <path id="fr" class="nc" d="M564.97,1232.96c.34-5.24-.15-2.28,1.99-19.67,.22-1.78,.79-4.34,1.11-5.81l1.29-3.89c-.09,1.3-.39,7.09-.62,8.94-2.14,17.39-1.65,14.43-1.99,19.67,0,0-.53,5.5,4.54,5.31,.19,0,.38-.01,.58-.04h.15c1.45-.01,13.84-.23,23.14-3.68,.19-.08,.39-.14,.58-.22-.16,.08-.32,.15-.47,.22-9.42,4.2-23.49,4.44-25.03,4.46h-.15c-.2,.02-.39,.03-.58,.03-5.06,.19-4.54-5.31-4.54-5.31">
                            </path>
                            <path id="fs" class="nc" d="M574.42,1227.69c-.24-1.07-.4-2.15-.48-3.24-.12-2.29,.01-4.59,.39-6.85,.35-2.31,.83-4.61,1.38-6.88,.28-1.15,.58-2.29,.9-3.43,.15-.54,.31-1.09,.46-1.63,.1-.56,.27-1.1,.49-1.62,.12-.21,.41-.5,.68-.37,.34,.17,.21,.73,.15,1.01-.22,1-.49,1.99-.71,2.99-.5,2.28-.94,4.57-1.26,6.88-.35,2.23-.51,4.48-.48,6.73,.02,1.06,.13,2.11,.33,3.15,.22,1.09,.61,2.12,.9,3.19,.36,1.28,.84,2.88-.3,3.92-.29,.3-.7,.44-1.11,.39-.44-.15-.73-.56-.73-1.03-.13-1.08-.34-2.15-.62-3.2">
                            </path>
                            <path id="ft" class="n" d="M569.38,1238.67c.26,0,.53-.02,.79-.04,.14-.03,16.99-.07,26.84-5.23,.5-.06,1.14-.73,1.33-4.76,.01-.15,1.55-16.86-3.68-27.23,.59-8.65,.12-17.33-1.39-25.86-.02-.14-2.08-15.21-2.23-18.79-.05-1.05-.58-10.24-4.44-10.24-1.58,0-3.35,1.55-5.43,4.75-.08,.13-6.18,11-8.37,19.28-.07,.18-7.76,21.84-5.11,36.94-.45,1.89-.8,3.81-1.03,5.74-1.69,13.78-1.74,14.79-1.86,17.23-.03,.64-.06,1.37-.13,2.46-.01,.1-.24,2.72,1.29,4.41,.89,.93,2.13,1.42,3.41,1.35m27.45-6.1s-.09,.02-.12,.04c-9.66,5.12-26.41,5.18-26.58,5.18-.29,.03-.53,.04-.75,.04-1.04,.06-2.06-.33-2.79-1.07-1.28-1.41-1.08-3.76-1.08-3.78,.07-1.11,.11-1.85,.14-2.49,.11-2.42,.16-3.42,1.85-17.17,.23-1.93,.57-3.84,1.03-5.73,.02-.07,.02-.14,0-.21-2.64-14.88,5-36.37,5.07-36.59,2.18-8.21,8.23-18.99,8.29-19.1,2.33-3.59,3.85-4.35,4.71-4.35,2.6,0,3.49,6.81,3.61,9.44,.15,3.61,2.15,18.26,2.24,18.88,1.52,8.5,1.99,17.16,1.38,25.77,0,.05,0,.1,0,.15,0,.03,.02,.06,.03,.09,5.19,10.15,3.66,26.73,3.65,26.9-.15,3.16-.57,3.86-.68,3.99">
                            </path>
                            <path id="fu" class="n" d="M569.47,1238.67c.25,0,.51-.02,.79-.04h0c.49,0,17.09-.12,26.83-5.23,.5-.06,1.14-.73,1.34-4.76,.08-.88,2.01-22.03-6.45-31.35-2.47-2.78-6.03-4.34-9.75-4.26-.42,0-.85,.02-1.28,.05-.07,0-.21-.02-.42-.02-1.89,0-11.42,.97-13.77,20.15-1.69,13.79-1.74,14.8-1.86,17.24-.03,.63-.06,1.37-.13,2.45,0,.1-.24,2.72,1.3,4.41,.88,.93,2.13,1.42,3.41,1.35m27.45-6.1s-.09,.02-.12,.04c-9.65,5.11-26.41,5.18-26.58,5.18-.29,.03-.53,.04-.75,.04-1.04,.06-2.06-.33-2.79-1.08-1.29-1.41-1.08-3.76-1.08-3.78,.07-1.1,.1-1.84,.14-2.48,.11-2.42,.16-3.42,1.85-17.18,2.27-18.48,11.18-19.41,12.94-19.41,.23,0,.36,.01,.37,.01,.51-.03,.93-.05,1.34-.05,3.48-.08,6.82,1.38,9.13,3.98,8.21,9.04,6.25,30.51,6.23,30.72-.15,3.16-.57,3.86-.68,3.99">
                            </path>
                        </g>
                        <g id="IPR_LR1" ${IPRArray.LR1.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="fv" class="mw" d="M504.9,1292.6v-.03c.04,1.53,.24,8.39,.38,11.91,0,0,.61,21,1.53,23.97,0,0,1.87,18.06,2.87,20.08,0,0,2.82,7.79,5.31,0,0,0,4.37-18.87,2.81-25.06,0,0,.24-14.86,.64-16.19,0,0,.7-11.65,1.18-16.18h0c-6.03,11.56-11.32,8.8-14.71,1.51">
                            </path>
                            <path id="fw" class="mk" d="M520.4,1286.12c.61-3.69,1.11-7.41,1.58-11.12,.25-1.95,.48-3.9,.63-5.86,.08-.78,.1-1.56,.06-2.35,.06-.56-.08-1.12-.41-1.58-.56-.55-1.26-.94-2.03-1.12-1.46-.38-2.96-.58-4.46-.58-3.39-.04-6.79,.19-10.14,.69-.52,.07-1.03,.14-1.55,.21-.21,0-.42-.04-.64-.03-.74-.06-1.42,.42-1.62,1.15-.02,.49,.02,.97,.12,1.45,0,.31,.02,.63,.03,.94,.11,3.39,.31,6.78,.59,10.16,.26,4.06,.83,8.09,1.72,12.06,.1,.43,.22,.86,.34,1.28,.14,.34,.24,.7,.3,1.06,.03,.29,.13,.57,.29,.81,.15,.31,.31,.61,.48,.92,.56,1.04,1.25,2.01,2.05,2.89,1.28,1.35,3.03,2.3,4.93,1.77,1.06-.34,2.02-.93,2.81-1.72,1.16-1.15,2.17-2.45,2.99-3.86,.21-.35,.42-.7,.62-1.06,.26-.35,.46-.75,.57-1.17,.05-.48,.12-.96,.2-1.44,.19-1.16,.37-2.33,.55-3.49">
                            </path>
                            <path id="fx" class="nc" d="M507.65,1265.2c.09,1.85,.4,3.68,.91,5.46,.24,.56,.44,1.14,.58,1.73,.04,.56-.38,1.05-.94,1.08-.19,.01-.39-.03-.56-.12-.54-.31-.55-.99-.65-1.54-.16-.98-.24-1.96-.26-2.95-.02-.93,.02-1.87,.1-2.8,0-.31,.04-.62,.1-.92,.03-.2,.22-.33,.42-.29,.17,.03,.29,.17,.3,.34">
                            </path>
                            <path id="fy" class="nc" d="M517.07,1264.22c.58,3.73,.8,7.51,.67,11.28,.03,.57-.41,1.05-.98,1.08-.05,0-.11,0-.16,0-.57-.09-.95-.63-.86-1.2,0-.04,.01-.07,.02-.1,.29-1.83,.49-3.67,.58-5.52,.05-1.28,.07-2.56,.05-3.84,0-.53-.02-1.05-.04-1.58-.02-.45,.65-.59,.72-.11">
                            </path>
                            <path id="g" class="mx" d="M522.61,1269.16c-.15,1.96-.38,3.91-.63,5.86-.47,3.71-.97,7.43-1.58,11.12-.18,1.16-.36,2.33-.55,3.49-.08,.48-.14,.96-.2,1.45-.12,.42-.31,.82-.57,1.17-.2,.36-.41,.71-.62,1.05-.29,.48-.6,.96-.93,1.42-.4,5.2-.8,11.85-.8,11.85-.4,1.32-.64,16.19-.64,16.19,1.57,6.19-2.81,25.06-2.81,25.06-.71,2.22-1.44,3.17-2.13,3.4,1.04,1.19,2.48,1.52,3.82-2.68,0,0,4.37-18.87,2.81-25.06,0,0,.24-14.86,.64-16.19,0,0,.68-11.25,1.16-15.93,.04-.09,.06-.19,.08-.28,.05-.48,.12-.97,.2-1.44,.19-1.16,.37-2.33,.55-3.49,.61-3.69,1.11-7.41,1.58-11.12,.25-1.95,.48-3.9,.63-5.86,.04-.58,.09-1.18,.09-1.77,0,.59-.05,1.18-.09,1.76">
                            </path>
                            <path id="ga" class="nc" d="M519.09,1292.24c.26-.35,.46-.75,.57-1.17,.05-.48,.12-.97,.2-1.45,.19-1.16,.37-2.33,.55-3.49,.61-3.69,1.11-7.41,1.58-11.12,.25-1.95,.48-3.9,.63-5.86,.04-.58,.09-1.17,.09-1.76,0-.2,0-.39-.02-.58,.06-.56-.08-1.12-.41-1.58-.56-.55-1.26-.94-2.03-1.12-.05-.02-.1-.02-.15-.04,.18,.12,.35,.27,.49,.43,.32,.46,.47,1.02,.41,1.58,.04,.78,.02,1.57-.06,2.35-.15,1.96-.38,3.91-.63,5.86-.47,3.71-.97,7.43-1.58,11.12-.18,1.16-.36,2.33-.55,3.49-.08,.48-.14,.96-.2,1.44-.01,.1-.04,.2-.08,.29-.11,1.08-.23,2.52-.35,4.08,.32-.47,.63-.94,.93-1.42,.21-.35,.42-.7,.62-1.06">
                            </path>
                            <path id="gb" class="n" d="M515.39,1348.72c.18-.77,4.35-18.94,2.82-25.21,.1-5.95,.34-15.09,.62-16.02,.01-.03,.02-.06,.02-.1,0-.12,.71-11.7,1.18-16.16,.02-.23-.14-.44-.37-.46-.17-.02-.33,.07-.41,.22-2.6,4.98-5.27,7.61-7.73,7.61-2.79,0-4.91-3.26-6.2-6.02-.04-.21-.22-.35-.43-.34-.23,.01-.4,.2-.4,.43,.05,1.93,.24,8.47,.38,11.91,.02,.86,.62,21.09,1.53,24,.08,.74,1.89,18.16,2.9,20.18,.14,.38,1.41,3.74,3.22,3.74,1.13,0,2.07-1.23,2.89-3.79m-3.88-49.27c2.5,0,5.02-2.12,7.49-6.3-.44,5.04-.95,13.48-.99,14.16-.4,1.61-.62,14.74-.65,16.25,0,.04,0,.07,.01,.11,1.52,6.02-2.76,24.67-2.8,24.83-.88,2.76-1.68,3.17-2.08,3.17-.93,0-1.98-1.95-2.45-3.23-.79-1.6-2.31-14.93-2.85-20.01-.89-2.89-1.5-23.65-1.51-23.86-.1-2.67-.24-7.22-.32-10.02,1.82,3.22,3.92,4.91,6.14,4.91">
                            </path>
                            <path id="gc" class="n" d="M512.79,1299.37c1.13-.35,2.15-.98,2.98-1.82,1.19-1.17,2.22-2.5,3.06-3.95,.21-.35,.42-.71,.62-1.07,.05-.08,.1-.17,.16-.26,.23-.32,.39-.68,.47-1.07,.05-.48,.12-.95,.19-1.42,.13-.77,.25-1.55,.37-2.32l.18-1.17c.65-3.9,1.16-7.82,1.58-11.14,.23-1.78,.48-3.85,.63-5.88v-.14c.09-.75,.1-1.51,.06-2.27,0-.11-.01-.21-.02-.31,.03-.55-.14-1.09-.49-1.52-.61-.61-1.39-1.04-2.23-1.24-1.49-.39-3.03-.6-4.57-.6-3.41-.04-6.83,.19-10.21,.69-.52,.07-1.03,.14-1.49,.21-.08,0-.17,0-.25-.01-.13-.01-.27-.02-.41-.02-.94-.06-1.79,.56-2.01,1.48-.05,.35-.04,.7,.05,1.04,.03,.16,.06,.33,.07,.5l.03,.94c.11,3.46,.31,6.89,.59,10.18,.26,4.08,.84,8.13,1.73,12.12,.11,.44,.22,.87,.35,1.3,.04,.12,.08,.24,.13,.36,.08,.19,.14,.39,.16,.59,.02,.31,.12,.61,.28,.87l.06,.12c.16,.32,.32,.63,.49,.94,.58,1.08,1.29,2.07,2.11,2.97,1.05,1.22,2.55,1.96,4.15,2.05h0c.4,0,.8-.05,1.19-.16m-9.03-34.45c.13,.01,.26,.02,.38,.01,.51-.07,1.03-.14,1.54-.21,3.34-.49,6.7-.72,10.08-.68,1.47,0,2.94,.19,4.36,.56,.69,.16,1.32,.5,1.83,.99,.22,.29,.32,.65,.29,1.01,0,.11,0,.22,.02,.34,.04,.71,.02,1.43-.05,2.14v.14c-.16,2.01-.41,4.07-.64,5.84-.42,3.31-.93,7.21-1.58,11.11l-.18,1.17c-.12,.77-.24,1.54-.37,2.32-.08,.49-.15,.98-.2,1.47-.07,.26-.19,.5-.34,.72-.06,.1-.13,.2-.18,.29-.2,.35-.4,.7-.61,1.04-.8,1.38-1.78,2.65-2.92,3.77-.73,.75-1.63,1.3-2.63,1.62-.31,.09-.64,.13-.96,.13h0c-1.37-.09-2.65-.74-3.54-1.79-.78-.85-1.44-1.79-1.99-2.8-.16-.3-.32-.6-.47-.9l-.06-.13c-.1-.16-.16-.33-.18-.51-.02-.3-.1-.59-.21-.86-.04-.11-.08-.21-.11-.31-.12-.42-.24-.84-.34-1.26-.88-3.95-1.45-7.96-1.71-11.99-.28-3.28-.47-6.69-.58-10.14l-.03-.94c-.01-.21-.04-.42-.08-.63-.06-.24-.08-.49-.05-.73,.13-.66,.82-.79,1.27-.81,.08,0,.17,0,.25,.02">
                            </path>
                        </g>
                        <g id="IPR_LR2" ${IPRArray.LR2.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="gd" class="mw" d="M480.05,1292.29c-2.7,5.75-4.24,5.78-4.24,5.78-5.65,1.45-8.89-5.12-10.83-10.44,.29,1.4,.5,2.23,.5,2.23,.16,.67,1.93,11.8,1.93,11.8,0,4.35,2.76,20.03,2.76,20.03,.18,3.7,2.27,17.8,2.27,17.8,1.27,6.4,1.91,8.75,1.91,8.75,6.46,4.23,5.58-23.14,5.58-23.14,.24-2.58,0-15.04,0-15.04,.29-2.21,.18-13.93,.13-17.76">
                            </path>
                            <path id="ge" class="mk" d="M475.81,1298.07s1.55-.03,4.25-5.78c0-.76-.02-1.21-.02-1.21,1.18-3.35,1.89-25.3,1.89-25.3-.33-3.55-8.35-1.91-8.35-1.91-11.04-.11-10.46,3.09-10.46,3.09-.69,7.1,.99,16.45,1.87,20.66,1.94,5.32,5.18,11.9,10.83,10.44">
                            </path>
                            <path id="gf" class="mk" d="M480.05,1291.07c1.17-3.35,1.89-25.3,1.89-25.3h0c-.01,.35-.72,21.97-1.88,25.29h0Z"></path>
                            <path id="gg" class="mk" d="M481.91,1265.6v.08s0-.05,0-.08"></path>
                            <path id="gh" class="mx" d="M480.06,1292.27c0-.71-.01-1.14-.02-1.2,0,0,0,.45,.02,1.21-.45,.98-.96,1.94-1.51,2.86,.04,5.04,.06,12.59-.17,14.31,0,0,.24,12.45,0,15.04,0,0,.74,22.88-4.07,23.57l.04,.15c6.46,4.23,5.58-23.14,5.58-23.14,.24-2.58,0-15.04,0-15.04,.29-2.21,.18-13.94,.13-17.76">
                            </path>
                            <path id="gi" class="mw" d="M481.88,1265.46s.02,.09,.03,.14c0-.05-.02-.09-.03-.14"></path>
                            <path id="gj" class="mw" d="M481.93,1265.76s0-.06-.01-.09c0,.03,0,.07,.01,.1h0"></path>
                            <path id="gk" class="mw" d="M481.88,1265.45c-.25-1.03-1.23-1.56-2.44-1.8,0,0,.01,.01,.02,.02,1.19,.24,2.17,.76,2.42,1.78"></path>
                            <path id="gl" class="nc" d="M480.05,1291.07h0c1.17-3.33,1.87-24.95,1.88-25.3,0-.03,0-.06-.01-.1s0-.05-.01-.08c0-.05-.02-.09-.03-.14h0c-.25-1.03-1.22-1.55-2.42-1.79,.53,.33,.87,.89,.93,1.52,0,0-1.85,28.55-1.83,29.96,.55-.93,1.06-1.88,1.51-2.86,0-.76-.02-1.21-.02-1.21">
                            </path>
                            <path id="gm" class="nc" d="M467.94,1264.78s.12,.66,.3,1.65,.4,2.32,.56,3.66c.04,.34,.08,.67,.11,1s.06,.66,.08,.98,.03,.63,.05,.92c0,.3,0,.58,0,.84s-.01,.5-.04,.72-.04,.4-.07,.56c-.06,.32-.09,.5-.09,.5-.06,.33-.38,.55-.71,.49-.33-.06-.55-.38-.49-.71h0s0-.02,0-.03v-.06s.05-.15,.11-.4c.03-.13,.05-.3,.09-.48s.05-.41,.08-.65,.03-.5,.05-.78c0-.28,.02-.57,.01-.88s0-.63-.02-.95-.03-.66-.05-.99c-.08-1.32-.23-2.65-.34-3.64s-.2-1.66-.2-1.66c-.02-.16,.1-.3,.26-.32,.15-.02,.28,.08,.31,.23">
                            </path>
                            <path id="gn" class="nc" d="M474.64,1264.55s0,.19,.02,.54c0,.17,.01,.38,.01,.62s0,.52,0,.81-.01,.61-.03,.95-.03,.69-.06,1.06c-.04,.73-.11,1.51-.16,2.29s-.1,1.54-.13,2.26c0,.36-.02,.7,0,1.02,0,.33,.02,.62,.03,.9,.03,.27,.05,.53,.08,.74s.07,.4,.1,.55c.08,.29,.12,.46,.12,.46l.02,.06c.11,.41-.12,.83-.53,.94-.41,.11-.83-.12-.94-.53v-.02s-.02-.04-.02-.05c0,0-.04-.21-.11-.59-.03-.18-.04-.41-.08-.66s-.02-.54-.03-.85c0-.3,0-.64,.04-.98s.05-.7,.09-1.08c.08-.74,.19-1.52,.31-2.29s.23-1.54,.33-2.26c.05-.36,.1-.71,.14-1.04s.07-.64,.1-.93,.05-.55,.07-.78,.03-.44,.04-.61c.01-.34,.02-.54,.02-.54,0-.16,.13-.29,.29-.29,.16,0,.29,.13,.29,.29">
                            </path>
                            <path id="go" class="n" d="M477.35,1348.04c3.69-3.81,3.13-22.48,3.1-23.22,.23-2.58,.01-14.58,0-15.02,.29-2.18,.19-13.19,.14-17.82,0-.23-.19-.42-.42-.41-.16,0-.3,.09-.37,.24-2.46,5.23-3.89,5.54-3.88,5.54-.03,0-.06,0-.09,.01-4.09,1.05-7.44-2.24-10.33-10.18-.07-.21-.3-.32-.51-.26-.21,.06-.34,.27-.29,.49,.29,1.4,.5,2.24,.5,2.24,.12,.52,1.31,7.92,1.92,11.7,0,4.33,2.65,19.46,2.76,20.05,.18,3.68,2.18,17.27,2.27,17.86,1.26,6.34,1.91,8.76,1.91,8.78,.03,.1,.09,.18,.17,.24,.44,.32,.97,.49,1.51,.51,.62-.01,1.2-.29,1.61-.75m-4.38-8.93c-.02-.14-2.09-14.12-2.27-17.81-.03-.16-2.75-15.7-2.76-20.03-.06-.34-1.05-6.59-1.6-9.88,1.76,3.63,4.29,6.99,8.03,6.99,.55,0,1.1-.07,1.63-.21,.38-.05,1.7-.53,3.77-4.45,.05,4.73,.11,14.06-.15,16.03,0,.12,.23,12.46,0,15.04,0,.19,.57,19.11-2.87,22.66-.48,.58-1.34,.67-1.93,.2-.16-.62-.79-3.15-1.85-8.55">
                            </path>
                            <path id="gp" class="n" d="M476,1298.17c.42-.05,2.03-.64,4.55-6.02,.03-.06,.04-.12,.04-.18l-.02-1.14c1.17-3.59,1.86-24.46,1.88-25.4-.11-1.22-1.06-2.67-4.95-2.67-1.29,.01-2.59,.14-3.86,.38h-.51c-6.58,0-8.99,1.23-9.85,2.26-.32,.34-.49,.79-.48,1.25-.67,6.99,.89,16,1.9,20.81,1.71,4.69,4.57,10.92,9.66,10.92,.55,0,1.1-.07,1.63-.21m-2.32-34.19s.06,0,.09,0c1.23-.23,2.48-.36,3.73-.37,1.8,0,3.97,.33,4.12,1.86,0,.22-.72,21.92-1.86,25.17-.02,.05-.02,.09-.02,.14l.02,1.12c-2.43,5.15-3.85,5.45-3.83,5.45-.03,0-.06,0-.09,.01-.47,.13-.96,.19-1.45,.19-3.43,0-6.33-3.39-8.86-10.32-.79-3.8-2.56-13.39-1.87-20.54,0-.03,0-.07,0-.1,0-.27,.13-.52,.33-.7,.64-.71,2.69-1.91,9.16-1.91h.54Z">
                            </path>
                        </g>
                        <g id="IPR_LR3" ${IPRArray.LR3.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="gq" class="mk" d="M438.66,1265.52c-3.33-6.47-14.06,4.62-14.06,4.62-10.89,6.29-4.86,25.42-2.49,31.77,3.74,5.35,10.64,8.8,22.47-2.67,1.42-7.55,2.72-15.55,2.72-15.55,.93-10.03-8.64-18.17-8.64-18.17">
                            </path>
                            <path id="gr" class="mw" d="M422.12,1301.92c.49,1.31,.83,2.07,.83,2.07,1.59,1.35,2.16,22.09,2.16,22.09-.94,7.32,.96,30.1,.96,30.1-.29,4.77-.12,10.4-.12,10.4,.78,3.01,3.26,1.4,5.5-1.84,6.42-9.27,7.24-20.88,7.24-20.88,1.83-5.82,3.12-32.29,3.12-32.29,.71-1.89,1.78-6.99,2.78-12.33-11.83,11.47-18.73,8.02-22.47,2.67">
                            </path>
                            <path id="gs" class="nc" d="M427.14,1271.41l-.02,.11c0,.07-.02,.17-.04,.3-.03,.26-.08,.64-.1,1.1s-.05,1-.05,1.57,.02,1.19,.06,1.8c.02,.3,.05,.61,.08,.91s.08,.59,.11,.87,.09,.55,.14,.81,.09,.5,.15,.72,.09,.43,.14,.6,.09,.33,.12,.46c.07,.25,.11,.4,.11,.4v.03c.11,.36-.11,.74-.47,.83-.36,.1-.74-.12-.83-.48,0-.01,0-.03,0-.04l-.09-.43c-.03-.14-.06-.31-.1-.5s-.07-.41-.11-.65-.08-.49-.1-.77-.07-.56-.09-.86-.05-.61-.06-.92-.03-.63-.02-.95c0-.64,.02-1.27,.05-1.87s.09-1.15,.16-1.62,.13-.86,.18-1.14c.03-.14,.05-.25,.06-.32s.02-.11,.02-.11c.05-.19,.24-.31,.44-.26,.18,.04,.3,.22,.27,.4v.02Z">
                            </path>
                            <path id="gt" class="nc" d="M437.62,1267.88s.04,.12,.12,.33,.17,.57,.28,.99,.23,.94,.36,1.53,.26,1.26,.39,1.99c.64,3.57,1.08,7.17,1.32,10.79,.06,.99,.11,1.98,.13,2.96,.02,.98,.03,1.94,.01,2.88s-.06,1.84-.14,2.71c-.02,.22-.04,.43-.05,.64s-.05,.42-.07,.62c-.04,.41-.1,.8-.16,1.18s-.13,.74-.19,1.09-.15,.67-.23,.98-.16,.6-.24,.86c-.04,.13-.08,.26-.12,.38s-.09,.24-.13,.35c-.09,.22-.16,.42-.23,.59s-.15,.31-.2,.43c-.11,.23-.17,.36-.17,.36-.28,.58-.98,.83-1.56,.55s-.83-.98-.55-1.56h0l.02-.04,.05-.09,.15-.27c.05-.09,.11-.2,.18-.33s.13-.29,.21-.47c.04-.09,.08-.18,.12-.28s.08-.21,.12-.32c.08-.23,.17-.47,.25-.74s.17-.55,.24-.87,.16-.63,.23-.98,.15-.71,.21-1.09c.03-.19,.06-.38,.1-.58s.06-.4,.08-.6c.11-.81,.19-1.68,.26-2.58s.11-1.84,.13-2.79,.03-1.93,.02-2.9c-.05-3.58-.3-7.15-.75-10.69-.09-.73-.19-1.39-.28-1.98s-.19-1.09-.27-1.51-.16-.73-.21-.94-.1-.34-.1-.34h0c-.06-.19,.05-.39,.24-.45,.19-.05,.38,.05,.44,.23">
                            </path>
                            <path id="gu" class="mk" d="M446.78,1286.64c-.46,2.71-1.18,6.94-1.97,11.2,.79-4.26,1.52-8.49,1.97-11.2">
                            </path>
                            <path id="gv" class="my" d="M442.34,1301.27c-.56,3.24-1.31,6.44-2.25,9.58,0,0-1.29,26.47-3.12,32.29,0,0-.83,11.61-7.25,20.88-1.21,1.74-2.48,3.01-3.53,3.34,.99,1.87,3.2,.28,5.21-2.62,6.42-9.27,7.25-20.88,7.25-20.88,1.83-5.82,3.12-32.29,3.12-32.29,.71-1.89,1.77-6.99,2.78-12.32,.09-.47,.18-.94,.26-1.41-.09,.47-.18,.94-.26,1.41-.76,.74-1.5,1.41-2.22,2.02">
                            </path>
                            <path id="gw" class="mw" d="M447.27,1283.7s-.18,1.13-.49,2.93c.3-1.8,.49-2.93,.49-2.93,.04-.47,.06-.94,.06-1.4,0,.46-.02,.92-.06,1.39">
                            </path>
                            <path id="gx" class="nc" d="M447.34,1282.3c-.01-9.38-8.71-16.78-8.71-16.78-.48-1.09-1.49-1.85-2.67-2,.41,.35,.74,.79,.98,1.27,0,0,9.57,8.15,8.65,18.18,0,0-1.3,8-2.72,15.55-.18,.93-.35,1.85-.53,2.74,.72-.62,1.46-1.29,2.22-2.02l.26-1.41c.79-4.26,1.51-8.49,1.97-11.2h0c.3-1.81,.49-2.94,.49-2.94,.04-.47,.06-.93,.06-1.39">
                            </path>
                            <path id="gy" class="n" d="M444.86,1299.64c.06-.06,.1-.14,.12-.23,1.41-7.47,2.71-15.48,2.73-15.59,.91-9.81-7.82-17.69-8.73-18.48-.63-1.36-2.01-2.22-3.51-2.18-4.43,0-10.53,6.11-11.14,6.74-11.18,6.53-4.83,26.33-2.62,32.25,.01,.03,.03,.07,.05,.09,2.39,3.42,5.35,5.16,8.79,5.16h0c4.18,0,8.99-2.61,14.31-7.77m-20.06-29.04s.06-.04,.09-.07c.06-.07,6.36-6.52,10.58-6.52,1.22-.03,2.33,.68,2.81,1.8,.02,.05,.06,.09,.1,.13,.1,.08,9.4,8.13,8.5,17.79-.01,.08-1.3,7.99-2.69,15.41-5.11,4.93-9.7,7.44-13.63,7.44h0c-3.14,0-5.86-1.6-8.08-4.75-2.18-5.83-8.33-25.06,2.32-31.21">
                            </path>
                            <path id="h" class="n" d="M431.76,1365.08c6.2-8.95,7.24-20.19,7.31-21.04,1.79-5.8,3.04-30.52,3.13-32.29,.62-1.69,1.55-5.84,2.78-12.34,.03-.18-.05-.36-.21-.45-.16-.08-.36-.06-.49,.07-9.27,8.99-16.83,9.9-21.83,2.73-.13-.19-.39-.24-.58-.1-.16,.11-.22,.31-.15,.49,.49,1.31,.82,2.06,.83,2.1,.02,.06,.06,.11,.11,.15,.9,.77,1.73,11.68,2.02,21.72-.93,7.28,.87,29.26,.95,30.13-.29,4.73-.12,10.38-.12,10.44,0,.03,0,.06,.01,.09,.41,1.58,1.24,1.91,1.87,1.91,1.64,0,3.45-2.26,4.38-3.61m-5.31-8.83c-.02-.23-1.88-22.83-.95-30.08-.09-3.2-.57-18.19-1.92-21.73,1.82,1.9,4.34,2.97,6.97,2.98,3.93,0,8.42-2.31,13.36-6.87-1.11,5.8-1.95,9.49-2.52,10.99-.02,.04-.02,.08-.03,.13-.01,.27-1.31,26.48-3.11,32.19,0,.03-.02,.06-.02,.1,0,.11-.89,11.61-7.17,20.67-1.39,2-2.81,3.25-3.69,3.25-.48,0-.83-.42-1.05-1.23-.01-.56-.15-5.85,.12-10.37">
                            </path>
                        </g>
                        <g id="IPR_LR4" ${IPRArray.LR4.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="ha" class="mw" d="M381.98,1296.44c.22,.42,.35,.66,.35,.66,.18,26.26,4.87,54.65,4.87,54.65,1.24,4.97,2.87,4.59,3.5,6.6,1.53,4.91,5.22-.05,5.22-.05,6.3-6.5,8.27-61.21,8.27-61.21,.28-.36,.51-.77,.67-1.2-7.54,7.15-17.11,4.45-22.86,.54">
                            </path>
                            <path id="hb" class="mk" d="M403.98,1269.93c-10.43-12.79-17.91-2.56-17.91-2.56-2.76,3.15-6.3,7.09-6.3,7.09-6.81,3.67,.48,18.66,2.21,21.98,5.76,3.91,15.32,6.6,22.86-.54,1.61-3.73,4.25-14.15,4.25-14.15,1.58-4.53-5.12-11.81-5.12-11.81">
                            </path>
                            <path id="hc" class="mx" d="M403.99,1269.9c-1.61-2.1-3.62-3.87-5.91-5.2h0c2.28,1.34,4.28,3.1,5.89,5.19,0,0,6.69,7.28,5.12,11.81,0,0-2.64,10.43-4.25,14.15-.91,.87-1.92,1.64-3,2.29-.48,10.89-2.68,52.99-8.16,58.64,0,0-1.35,1.81-2.75,2.16,1.63,3.83,4.98-.67,4.98-.67,6.3-6.49,8.27-61.21,8.27-61.21,.29-.36,.51-.77,.67-1.2,1.61-3.73,4.25-14.15,4.25-14.15,1.57-4.53-5.12-11.81-5.12-11.81">
                            </path>
                            <path id="hd" class="nc" d="M409.09,1281.71c1.58-4.53-5.12-11.81-5.12-11.81-1.61-2.09-3.61-3.86-5.89-5.18,1.35,1.1,2.58,2.34,3.67,3.7,0,0,6.69,7.29,5.12,11.81,0,0-2.64,10.43-4.25,14.16-.16,.43-.38,.84-.67,1.2,0,0-.03,.94-.11,2.57,1.08-.65,2.09-1.42,3-2.29,1.61-3.72,4.25-14.15,4.25-14.15">
                            </path>
                            <path id="he" class="nc" d="M384.08,1292.26s.2,.2,.53,.56c.17,.18,.38,.41,.62,.66,.23,.25,.49,.54,.78,.83s.6,.6,.94,.9c.18,.14,.36,.29,.54,.44,.19,.14,.4,.26,.6,.4s.44,.23,.66,.35,.47,.19,.72,.3c.25,.1,.5,.18,.76,.24l.39,.11,.4,.07c.27,.04,.53,.11,.81,.13l.82,.08c.54,.05,1.08,.03,1.6,.05,.52,0,1.03-.04,1.51-.05s.93-.08,1.35-.11,.8-.07,1.14-.12,.64-.08,.88-.12l.77-.1-.75,.17c-.24,.05-.53,.12-.87,.2s-.72,.15-1.13,.23-.87,.17-1.35,.24-.99,.14-1.52,.2c-.53,.03-1.08,.1-1.65,.1h-.86c-.29,0-.58-.04-.87-.06l-.43-.04-.43-.08c-.29-.04-.58-.1-.86-.18-.28-.09-.57-.15-.83-.26s-.54-.21-.79-.33-.5-.26-.73-.4c-.23-.15-.45-.3-.66-.43-.41-.31-.79-.6-1.11-.89-.34-.28-.62-.55-.88-.77l-.65-.58c-.38-.32-.59-.51-.59-.51h0c-.35-.3-.39-.84-.09-1.19,.3-.35,.84-.39,1.19-.09,.02,.02,.04,.04,.06,.06">
                            </path>
                            <path id="hf" class="n" d="M396.22,1358.7c6.24-6.43,8.24-57.56,8.38-61.34,.26-.37,.47-.77,.64-1.2l.81-1.88-1.48,1.41c-2.84,2.8-6.67,4.36-10.66,4.34-4.18-.12-8.24-1.45-11.68-3.84l-1.37-.93,.76,1.47c.14,.27,.24,.46,.3,.57,.19,25.96,4.82,54.33,4.88,54.65,.8,3.19,1.76,4.25,2.53,5.11,.44,.42,.78,.94,.98,1.52,.51,1.64,1.32,2.47,2.42,2.47,1.74,0,3.46-2.29,3.5-2.34m-2.32-57.83c3.57,.03,7.05-1.16,9.85-3.38-.17,4.46-2.27,54.57-8.17,60.67-.42,.57-1.77,2.05-2.86,2.05-.69,0-1.23-.63-1.62-1.88-.23-.7-.63-1.32-1.15-1.83-.71-.78-1.59-1.76-2.33-4.71-.05-.28-4.64-28.42-4.86-54.25,3.35,2.1,7.2,3.25,11.14,3.34">
                            </path>
                            <path id="hg" class="n" d="M405.14,1296.3l.1-.14c1.6-3.71,4.17-13.79,4.26-14.18,1.64-4.71-4.92-11.93-5.19-12.21-3.57-4.37-7.2-6.59-10.79-6.59-4.77,0-7.66,3.88-7.76,4.02-2.55,2.91-5.82,6.55-6.25,7.03-6.91,3.83-.14,18.18,2.1,22.5l.05,.09,.09,.06c3.58,2.48,7.8,3.87,12.15,3.98,4.2,.02,8.24-1.62,11.24-4.57m-25.16-21.37l.11-.09s3.58-3.98,6.33-7.12c.03-.04,2.76-3.7,7.1-3.7,3.33,0,6.75,2.11,10.16,6.3,.07,.07,6.5,7.15,5.02,11.42-.03,.1-2.62,10.29-4.2,14.01-2.83,2.76-6.64,4.3-10.6,4.28-4.15-.11-8.17-1.43-11.59-3.78-1.64-3.17-8.77-17.86-2.33-21.32">
                            </path>
                        </g>
                        <g id="IPR_LR5" ${IPRArray.LR5.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="hh" class="mw" d="M341.38,1290.72c.8,1.76,1.7,3.47,2.7,5.13-.38,1.58,1.88,14.83,1.88,14.83,1.1,4.34,2.71,10.45,2.71,10.45,.71,3.61,3.5,13.4,3.5,13.4,2.04,6.45,1.4,16.37,1.4,16.37,.3,5.6,5.6,1.92,5.6,1.92,5.68-3.98,4.29-39.95,4.29-39.95,.59-2.97,.85-15.79,.85-15.79,.29-.71,.54-1.44,.75-2.18-10.65,11.61-18.66,3.5-23.65-4.21">
                            </path>
                            <path id="hi" class="mk" d="M358.35,1265.71c-4.28-4.74-8.47-.38-8.47-.38-1.74,.99-7.82,7.17-7.82,7.17-6.29,3.15-3.37,12.36-.67,18.23,5,7.7,13,15.82,23.65,4.21,1.53-5.28,3.33-15.64,3.33-15.64,1.71-5.87-9.35-12.85-10.01-13.58">
                            </path>
                            <path id="hj" class="nc" d="M347.5,1293.88l1.47,.96c.22,.14,.46,.28,.71,.44,.26,.14,.52,.3,.81,.43,.14,.07,.29,.14,.43,.2,.15,.06,.29,.13,.45,.18s.31,.1,.46,.14l.47,.1c.31,.05,.63,.08,.95,.08h.23c.08,0,.16,0,.23-.01,.15-.01,.31-.03,.45-.04l.44-.08c.08-.01,.14-.03,.21-.04s.14-.04,.21-.06c.27-.08,.53-.13,.76-.23s.44-.17,.63-.23c.19-.08,.35-.16,.48-.22l.41-.19,.07-.03c.57-.27,1.25-.12,1.65,.37,.27,.4,.16,.95-.24,1.22-.07,.05-.14,.08-.22,.11-.05,.02-.09,.04-.14,.05l-.53,.17-.6,.19-.81,.2c-.29,.08-.64,.12-.99,.19-.09,.01-.18,.03-.27,.04l-.29,.02-.59,.04c-.2,0-.41,0-.63,0-.1,0-.21,0-.32-.01s-.21-.03-.32-.04c-.43-.05-.85-.13-1.27-.25-.2-.07-.4-.14-.59-.2s-.37-.16-.55-.24-.34-.18-.51-.27c-.16-.09-.31-.18-.46-.28-.3-.19-.56-.39-.81-.57-.24-.19-.47-.37-.67-.53l-1.31-1.1h0c-.13-.1-.16-.28-.06-.41,.02-.03,.04-.05,.07-.07,.17-.12,.38-.12,.56-.02">
                            </path>
                            <path id="hk" class="mx" d="M358.36,1265.71c-.36-.4-.76-.77-1.19-1.09,.43,.32,.83,.69,1.18,1.09,.66,.73,11.72,7.71,10.01,13.58,0,0-1.8,10.37-3.33,15.65-.94,1.04-1.97,2-3.07,2.87-.09,3.58-.35,11.8-.81,14.11,0,0,1.39,35.96-4.29,39.95-.84,.57-1.79,.96-2.78,1.15,1.4,2.37,5.06-.17,5.06-.17,5.68-3.98,4.29-39.95,4.29-39.95,.59-2.97,.85-15.78,.85-15.78,1.61-3.62,4.07-17.82,4.07-17.82,1.71-5.87-9.35-12.85-10.01-13.58">
                            </path>
                            <path id="hl" class="nc" d="M365.05,1294.94c1.53-5.28,3.33-15.65,3.33-15.65,1.7-5.87-9.35-12.85-10.01-13.58-.36-.4-.75-.77-1.18-1.09l-.02-.02c-.12-.09-.24-.17-.36-.25-.02,0-.03-.02-.05-.03-.12-.08-.23-.14-.35-.2-.02,0-.04-.02-.06-.03-.11-.06-.23-.12-.34-.17,0,0-.01,0-.02,0-.33-.14-.67-.25-1.02-.31-.04,0-.08-.02-.11-.02-.02,0-.03,0-.05,0,.47,.34,.9,.73,1.29,1.16,.66,.74,11.72,7.71,10.01,13.58,0,0-2.46,14.19-4.07,17.82,0,0-.01,.65-.04,1.68,1.1-.87,2.12-1.83,3.07-2.87">
                            </path>
                            <path id="hm" class="n" d="M359.38,1353.6c5.75-4.03,4.55-38.2,4.47-40.26,.56-2.96,.82-14.53,.85-15.73,.29-.7,.53-1.42,.73-2.15,.06-.22-.06-.45-.28-.52-.15-.04-.32,0-.43,.12-3.46,3.77-6.88,5.68-10.17,5.68-4.34,0-8.54-3.22-12.83-9.83-.13-.19-.39-.25-.58-.12-.17,.11-.24,.34-.15,.52,.79,1.73,1.67,3.41,2.64,5.04-.23,2.18,1.68,13.49,1.91,14.85,1.1,4.33,2.71,10.43,2.71,10.43h0c.7,3.58,3.47,13.34,3.51,13.45,1.99,6.3,1.38,16.12,1.38,16.27,.16,2.9,1.6,3.51,2.78,3.51,1.25-.11,2.44-.55,3.47-1.26m-4.84-52.02c3.13,0,6.32-1.56,9.52-4.65-.06,.16-.12,.3-.17,.42-.02,.05-.03,.11-.04,.16,0,.13-.27,12.81-.84,15.71,0,.03,0,.06,0,.1,.48,12.36,.24,36.54-4.11,39.59-.89,.61-1.92,.99-3,1.11-.44,0-1.79,0-1.94-2.66,.03-.41,.62-10.07-1.41-16.51-.03-.1-2.79-9.82-3.49-13.4,0,0-1.61-6.11-2.7-10.42-.9-5.29-2.15-13.57-1.89-14.67,.03-.11,0-.22-.05-.32,0,0-.08-.14-.23-.38,3.39,3.96,6.81,5.9,10.35,5.9">
                            </path>
                            <path id="hn" class="n" d="M365.33,1295.63s.07-.1,.09-.17c1.52-5.24,3.32-15.59,3.33-15.64,1.52-5.25-6.27-11.08-9.2-13.28-.41-.3-.83-.62-.9-.7-1.12-1.42-2.81-2.28-4.62-2.35-1.66,.07-3.24,.76-4.42,1.92-1.76,1.05-7.2,6.54-7.81,7.16-4.92,2.51-5.2,9.17-.77,18.8,4.46,6.87,8.88,10.21,13.53,10.21h0c3.54,0,7.17-2,10.79-5.95m-7.31-29.23c.32,.29,.66,.56,1.02,.81,2.54,1.9,10.26,7.68,8.89,12.42-.02,.1-1.79,10.28-3.29,15.5-3.43,3.72-6.83,5.6-10.1,5.6-4.34,0-8.54-3.22-12.8-9.78-2.43-5.3-5.61-14.64,.48-17.68,.04-.02,.08-.05,.11-.08,.06-.06,6.06-6.14,7.73-7.1,.03-.02,.07-.05,.09-.08,1.04-1.01,2.41-1.62,3.86-1.7,1.57,.08,3.03,.83,4,2.07">
                            </path>
                        </g>
                        <g id="IPR_LR8" ${IPRArray.LR8.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="ho" class="nb" d="M200.03,1270.05s.82,2.51,5.48-1.86c0,0,5.92-5.59,16.21,3.78-1.08-2.11-2.47-4.04-4.13-5.73-4.81-5.56-13.76,1.23-13.76,1.23-1.23,1.41-3.21-.76-3.21-.76-3.07-3.07-8.7,.61-11.06,2.41,4.58-1.11,8.97-1.39,10.47,.93">
                            </path>
                            <g>
                                <path id="hp" class="mw" d="M208.96,1294.5c-8.04-2.59-11.05-.19-11.05-.19-2.23,1.16-7.21-.4-12.1-3.09,.28,.75,.47,1.18,.47,1.18-1.89,5.23,.75,15.41,.75,15.41,.62,2.56,.85,5.2,.66,7.82-1.41,3.77-1.98,11.6-1.98,11.6-1.13,5.75,.57,7.35,.57,7.35,.75,2.92,3.96-.47,3.96-.47-.75,3.39,3.58,1.7,3.58,1.7,2.17-1.04,15.65-13.39,15.65-13.39,6.69-4.52,9.43-24.89,9.43-24.89,.08-1.23,.24-2.46,.47-3.67-6.48,1.97-10.41,.64-10.41,.64">
                                </path>
                                <path id="hq" class="mk" d="M222.77,1277.45c.23-1.89-.13-3.81-1.05-5.49-10.29-9.36-16.21-3.78-16.21-3.78-4.66,4.37-5.48,1.86-5.48,1.86-1.5-2.32-5.89-2.03-10.47-.93-.68,.52-1.1,.89-1.1,.89-7.8,5.28-4.07,17.38-2.64,21.21,4.88,2.69,9.87,4.25,12.1,3.09,0,0,3.01-2.4,11.05,.19,0,0,3.94,1.33,10.41-.64,.42-2.28,.95-4.15,.95-4.15,2.45-4.9,2.45-12.25,2.45-12.25">
                                </path>
                                <path id="hr" class="my" d="M217.22,1297.05s-2.73,20.36-9.43,24.89c0,0-13.48,12.35-15.65,13.39-.55,.21-1.13,.34-1.71,.41,.84,1.07,3.4,.08,3.4,.08,2.17-1.04,15.65-13.39,15.65-13.39,6.69-4.52,9.43-24.89,9.43-24.89,.08-1.21,.23-2.42,.46-3.61-.64,.19-1.26,.36-1.85,.49-.14,.88-.24,1.79-.29,2.64">
                                </path>
                                <path id="hs" class="nc" d="M222.78,1277.45c.08-.45,.11-.91,.09-1.37-.1-1.42-.49-2.8-1.15-4.06-.81-.74-1.65-1.43-2.54-2.08,1.28,2.07,2.34,4.64,1.91,7.03,0,0,0,7.35-2.45,12.25-.47,1.71-.84,3.44-1.12,5.18,.59-.13,1.21-.3,1.85-.49,.42-2.3,.96-4.21,.96-4.21,2.45-4.9,2.45-12.25,2.45-12.25">
                                </path>
                                <path id="ht" class="nc" d="M206.05,1289.64s.18,.1,.48,.28c.15,.09,.34,.21,.55,.34s.44,.28,.7,.42,.53,.3,.83,.45c.15,.07,.31,.13,.47,.2,.16,.06,.33,.11,.5,.17s.36,.08,.54,.13,.38,.05,.57,.08c.2,.02,.4,.03,.6,.03h.61c.21-.03,.41-.03,.62-.05s.41-.06,.61-.08c.41-.05,.81-.15,1.2-.23,.39-.09,.76-.19,1.11-.28s.68-.2,.99-.29,.59-.18,.83-.27l.64-.22c.35-.12,.55-.19,.55-.19,0,0-.19,.09-.53,.24-.17,.08-.38,.17-.61,.27s-.51,.22-.81,.34-.62,.26-.97,.38-.71,.25-1.1,.38c-.39,.11-.79,.25-1.21,.34-.21,.05-.42,.1-.63,.14s-.43,.07-.65,.1l-.33,.05-.33,.02c-.22,.02-.44,.03-.66,.02-.22-.01-.44,0-.66-.03s-.43-.05-.63-.09-.41-.09-.6-.14l-.56-.18c-.35-.14-.67-.27-.96-.41s-.54-.26-.76-.37l-.57-.28-.51-.24c-.27-.12-.39-.43-.28-.7,.01-.03,.02-.05,.04-.07,.19-.29,.56-.39,.87-.25,.02,.01,.04,.02,.05,.03">
                                </path>
                                <path id="hu" class="nc" d="M201.05,1272.78l-.56,1.81c-.08,.27-.16,.56-.25,.87s-.17,.64-.24,.99c-.04,.17-.08,.35-.1,.53s-.07,.36-.08,.55-.04,.38-.06,.56l-.03,.57c0,.38,0,.76,.03,1.14l.02,.28c0,.09,.03,.18,.04,.28,.02,.18,.05,.36,.08,.54,.04,.18,.07,.35,.1,.52,.02,.08,.03,.17,.05,.25s.04,.16,.06,.24c.09,.32,.15,.62,.25,.89l.24,.74,.21,.56c.11,.31,.18,.48,.18,.48l.03,.08c.26,.65,.22,1.37-.11,1.99-.31,.42-.77,.21-1.02-.47-.02-.05-.04-.11-.05-.16,0,0-.06-.23-.18-.61-.06-.19-.12-.43-.2-.7-.07-.29-.15-.61-.23-.96-.09-.34-.15-.76-.24-1.17-.02-.11-.04-.21-.06-.32s-.03-.23-.05-.34c-.03-.23-.06-.46-.09-.7-.02-.24-.04-.49-.06-.74,0-.13-.02-.25-.02-.38s0-.26,0-.38c0-.51,.01-1.02,.06-1.52,.03-.24,.06-.48,.09-.72,.04-.23,.08-.45,.12-.68s.1-.42,.15-.62,.1-.39,.16-.57c.11-.38,.23-.69,.34-1,.12-.29,.23-.58,.33-.83l.68-1.63h0c.08-.2,.24-.2,.36-.01,.1,.21,.13,.44,.07,.66">
                                </path>
                                <path id="hv" class="my" d="M194.04,1326.76c.23-.35,.91-3.04,1.61-2,.87,1.31-2.09,3.94-2.82,4.1-.21,.03,.55-1.16,1.21-2.1">
                                </path>
                                <path id="hw" class="my" d="M196.92,1321.56s.6-1.22,1.49-3.04c.23-.45,.45-.95,.7-1.47,.23-.53,.48-1.08,.71-1.68,.12-.29,.24-.59,.34-.91s.23-.62,.32-.95,.2-.65,.29-.98l.25-1c.13-.68,.27-1.35,.35-2.04l.07-.5c.02-.17,.03-.34,.04-.51,.03-.33,.05-.66,.08-.99,0-.33,.01-.65,.02-.96,0-.16,0-.31,.01-.46s0-.31-.01-.46c-.02-.6,0-1.16-.06-1.67-.03-.51-.07-.99-.1-1.4-.05-.41-.09-.77-.12-1.07-.07-.59-.1-.92-.1-.92l-.02-.15c-.16-1.24,.15-2.49,.87-3.51,.62-.65,1.25-.12,1.39,1.18,.01,.1,.02,.21,.02,.31,0,0,.02,.42,.05,1.15,.02,.37,.04,.81,.06,1.32,0,.53,0,1.13,.01,1.79,.02,.64-.03,1.41-.06,2.17,0,.2-.01,.39-.02,.59s-.03,.42-.05,.63c-.04,.42-.07,.85-.11,1.28-.05,.44-.12,.89-.18,1.35-.03,.23-.06,.45-.1,.68s-.09,.46-.13,.69c-.16,.92-.39,1.82-.63,2.7-.13,.42-.26,.84-.39,1.26-.14,.4-.29,.78-.43,1.16s-.3,.71-.44,1.06-.3,.66-.45,.96c-.3,.63-.59,1.15-.87,1.67-.28,.49-.54,.96-.79,1.36l-1.62,2.67h0c-.2,.33-.44,.29-.54-.1-.09-.41-.04-.83,.13-1.21">
                                </path>
                                <path id="hx" class="n" d="M193.58,1336.22c2.2-1.05,15.2-12.95,15.7-13.42,6.77-4.58,9.49-24.34,9.61-25.21,.08-1.21,.23-2.42,.46-3.62,.04-.23-.11-.45-.34-.49-.07-.01-.13,0-.2,.01-2.15,.68-4.4,1.03-6.65,1.06-1.18,.03-2.37-.11-3.51-.42-2.2-.76-4.49-1.17-6.82-1.23-3.2,0-4.56,1.06-4.55,1.06-.54,.25-1.14,.36-1.73,.34-2.36,0-6.09-1.28-9.97-3.43-.15-.09-.34-.07-.47,.05-.13,.11-.18,.3-.12,.46,.19,.5,.34,.86,.42,1.05-1.8,5.33,.69,15.08,.8,15.49,.6,2.5,.82,5.07,.65,7.63-1.4,3.8-1.96,11.34-1.98,11.61-1.02,5.21,.23,7.19,.6,7.64,.33,1.16,1.03,1.4,1.57,1.4,.85-.11,1.65-.48,2.28-1.06,.03,.32,.15,.62,.35,.88,.42,.46,1.03,.7,1.65,.65,.77-.03,1.53-.19,2.25-.46m-4.07-2.36c-.38,.4-1.63,1.53-2.46,1.53-.15,0-.56,0-.79-.87-.02-.07-.06-.14-.11-.2-.02-.02-1.5-1.6-.44-7.02,0-.08,.58-7.81,1.95-11.48,.01-.03,.02-.07,.02-.1,.2-2.68-.03-5.37-.67-7.97-.03-.1-2.59-10.11-.76-15.17,.04-.1,.03-.21-.01-.31,0,0-.02-.04-.05-.1,3.68,1.91,7.05,2.99,9.36,2.99,.76,.03,1.51-.14,2.18-.48,.01,0,1.22-.92,4.1-.92,2.23,.06,4.44,.45,6.55,1.18,1.23,.34,2.5,.5,3.77,.46,2.11-.02,4.22-.32,6.25-.91-.17,1-.29,2.01-.35,3.03-.03,.2-2.78,20.23-9.3,24.63-4.65,4.26-13.88,12.52-15.52,13.31-.62,.23-1.27,.37-1.92,.4-.36,.04-.73-.08-.99-.33-.21-.39-.24-.86-.1-1.28,.04-.18-.05-.37-.21-.46-.06-.03-.13-.05-.2-.05-.12,0-.23,.05-.31,.13">
                                </path>
                                <path id="hy" class="n" d="M219.06,1294.3c.15-.05,.26-.17,.29-.33,.4-2.2,.92-4.04,.91-4.04,2.47-4.93,2.5-12.14,2.49-12.37,.26-1.98-.12-3.99-1.09-5.74-.02-.05-.06-.09-.09-.13-4.04-3.68-7.91-5.54-11.49-5.54-1.92-.07-3.8,.56-5.29,1.77-2.17,2.04-3.39,2.46-4.03,2.46-.32,.03-.63-.14-.77-.43-.01-.03-.03-.07-.05-.1-1.39-2.15-5.08-2.52-10.92-1.11-.06,.01-.11,.04-.15,.08-.67,.51-1.08,.87-1.08,.87-8.08,5.47-4.18,17.99-2.8,21.7,.03,.09,.1,.17,.19,.22,4.07,2.24,7.85,3.53,10.38,3.53,.76,.03,1.51-.14,2.18-.48,.01,0,1.23-.92,4.1-.92,2.23,.06,4.44,.45,6.55,1.18,1.23,.34,2.5,.5,3.77,.46h0c2.34-.03,4.66-.39,6.9-1.1m-21.77-.33c-.54,.25-1.14,.36-1.73,.34-2.33,0-6-1.25-9.84-3.35-1.38-3.73-4.94-15.51,2.58-20.6,0,0,.38-.34,1-.81,5.31-1.27,8.74-1.02,9.91,.74,.27,.6,.88,.98,1.54,.94,1.15,0,2.7-.9,4.6-2.69,1.34-1.06,3.01-1.6,4.72-1.54,3.35,0,7,1.77,10.87,5.27,.87,1.6,1.21,3.43,.98,5.23,0,.08-.03,7.31-2.43,12.14,0,.02-.5,1.78-.91,3.94-2.08,.63-4.24,.96-6.41,.99-1.18,.03-2.37-.11-3.51-.42-2.19-.76-4.49-1.17-6.81-1.23-3.2,0-4.56,1.06-4.55,1.06">
                                </path>
                            </g>
                            <path id="i" class="n" d="M221.29,1272.42c.23,0,.42-.19,.43-.42,0-.1-.04-.2-.11-.28-1.09-2.1-2.49-4.04-4.14-5.73-1.3-1.53-3.23-2.39-5.24-2.33-4.43,0-8.91,3.36-9.09,3.5-.02,.02-.04,.04-.06,.06-.16,.21-.42,.33-.68,.33-.74-.14-1.42-.54-1.91-1.11-.88-.87-2.07-1.34-3.31-1.3-3.03,0-6.51,2.3-8.31,3.68-.18,.14-.22,.4-.08,.59,.1,.13,.27,.19,.43,.15,5.36-1.3,8.82-1.05,10,.72,.27,.6,.88,.98,1.54,.94,1.15,0,2.7-.9,4.6-2.69,1.34-1.06,3.01-1.6,4.72-1.54,3.37,0,7.04,1.79,10.93,5.32,.08,.07,.18,.11,.28,.11h.01Zm-30.25-4.11c1.77-1.15,4.1-2.34,6.14-2.34,1-.03,1.98,.34,2.7,1.05,.13,.14,1.29,1.37,2.51,1.37,.49,0,.96-.21,1.28-.59,.4-.3,4.6-3.31,8.56-3.31,1.78-.05,3.48,.71,4.63,2.07,1.07,1.1,2.03,2.3,2.87,3.58-3.38-2.65-6.62-3.99-9.66-3.99-1.92-.07-3.8,.56-5.29,1.77-2.17,2.04-3.39,2.46-4.03,2.46-.32,.03-.63-.14-.77-.43-.01-.03-.03-.07-.05-.1-.84-1.3-2.51-1.95-4.98-1.95-1.32,.02-2.64,.16-3.93,.41">
                            </path>
                        </g>
                        <g id="IPR_LR7" ${IPRArray.LR7.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="ia" class="mk" d="M260.69,1265.08c-.17,.09-.32,.21-.45,.35-2.38-2.27-6.55,.99-7.58,1.88-.23,.37-.35,.6-.35,.6-1.98,2.46-3.08,.82-3.08,.82-1.5-1.4-3.09-2.27-6.67-3.69-2.11-.2-4.19,.57-5.66,2.09-9.71,5.78-4.25,17.66-2.89,20.27,5.08,3.41,7.61,2.63,11.8,2.36,0,0,6.74-3.11,12.12,.27,0,0,2.94,1.25,8.48,.36,.93-3.56,2.06-4.35,2.06-4.35,2.11-4.65,2.34-9.93,.62-14.74-3.24-.31-6.02-4.02-8.39-6.21">
                            </path>
                            <path id="ib" class="nc" d="M253.75,1285.16l.41,.27c.13,.09,.29,.2,.47,.32s.38,.26,.59,.4,.45,.28,.7,.42c.13,.06,.26,.12,.4,.19,.14,.06,.28,.11,.42,.16s.3,.08,.46,.13,.32,.05,.48,.08c.17,.02,.33,.04,.5,.04h.51c.17,0,.34,0,.52-.03l.51-.07c.34-.04,.67-.13,1-.19,.32-.08,.63-.16,.93-.24s.57-.18,.82-.25,.49-.15,.69-.23,.38-.14,.53-.19l.46-.17-.44,.21c-.14,.07-.31,.15-.51,.24s-.42,.19-.67,.29-.51,.23-.8,.33-.59,.22-.91,.33c-.32,.09-.65,.21-1,.29l-.53,.12c-.18,.04-.36,.05-.54,.08l-.28,.04h-.28c-.18,.02-.37,.03-.55,.02-.18-.02-.37-.01-.55-.04s-.36-.05-.53-.1-.34-.09-.51-.14-.31-.12-.47-.18c-.29-.13-.57-.26-.81-.39s-.46-.25-.65-.35l-.48-.27-.43-.23h0c-.25-.13-.35-.45-.22-.7h0c.14-.27,.46-.36,.72-.22l.04,.02">
                            </path>
                            <path id="ic" class="nc" d="M249.63,1271.83s-.22,.73-.55,1.81c-.08,.27-.16,.56-.25,.87s-.17,.64-.24,.99c-.04,.17-.08,.35-.1,.53s-.07,.36-.08,.55-.04,.38-.06,.56l-.03,.57c0,.38,0,.76,.03,1.14l.02,.28c0,.09,.03,.18,.04,.28,.02,.18,.05,.36,.08,.54s.07,.35,.11,.52c.02,.08,.03,.17,.05,.25s.04,.16,.06,.24c.09,.32,.15,.62,.24,.89s.16,.52,.24,.74,.15,.4,.21,.56c.11,.31,.18,.48,.18,.48l.03,.08c.26,.65,.22,1.37-.11,1.99-.31,.42-.77,.21-1.02-.47-.02-.05-.04-.11-.05-.16,0,0-.06-.23-.18-.61-.06-.19-.12-.43-.2-.7-.07-.29-.15-.61-.23-.96-.09-.34-.15-.76-.24-1.17-.02-.1-.04-.21-.06-.32s-.03-.23-.05-.34c-.03-.23-.06-.47-.09-.7s-.04-.5-.06-.75c0-.13-.02-.25-.02-.38s0-.26,0-.38c0-.51,.01-1.02,.06-1.52,.03-.24,.06-.48,.09-.72s.08-.45,.12-.68,.1-.42,.15-.62,.1-.39,.16-.57c.11-.37,.23-.69,.34-1,.11-.29,.23-.58,.32-.83l.68-1.62h0c.08-.2,.24-.21,.35-.02,.1,.2,.13,.44,.07,.66">
                            </path>
                            <path id="id" class="mw" d="M266.4,1290.39c-5.54,.89-8.48-.36-8.48-.36-5.37-3.38-12.12-.27-12.12-.27-4.19,.27-6.72,1.05-11.8-2.36,.17,.34,.28,.52,.28,.52,6.66,9.99-8.87,24.72,4.56,36.33,3,2.59,2.48-2.09,2.48-2.09-.52-9.26,4.17-13.43,4.17-13.43,5.35-7.7,7.96-1.56,7.96-1.56,2.48,5.09-3.91,16.69-3.91,16.69,.39,4.17,4.7,1.17,4.7,1.17,11.87-8.22,10.95-21.52,10.95-21.52-.06-6.4,.52-10.51,1.2-13.13">
                            </path>
                            <path id="ie" class="nb" d="M252.3,1267.91s.12-.23,.35-.6c-.15,.13-.24,.21-.24,.21-5.09-5.35-7.3-1.56-7.3-1.56-.78-.47-1.65-.78-2.56-.92,3.58,1.42,5.17,2.29,6.67,3.69,0,0,1.09,1.64,3.08-.82">
                            </path>
                            <path id="if" class="nb" d="M260.69,1265.08c2.37,2.19,5.14,5.9,8.39,6.21-.06-.16-.1-.25-.1-.25-4.61-6.91-7.29-6.51-8.29-5.96">
                            </path>
                            <path id="ig" class="my" d="M266.41,1290.38h0s-.04,0-.05,0c-.66,.1-1.28,.18-1.86,.23-.77,4-1.09,8.08-.97,12.16,0,0,.91,13.3-10.95,21.52-.77,.53-1.64,.88-2.56,1.03,1.2,1.82,4.25-.31,4.25-.31,11.87-8.22,10.95-21.52,10.95-21.52-.05-6.39,.52-10.49,1.2-13.11">
                            </path>
                            <path id="ih" class="my" d="M249.86,1292.93c-.93,1.69-.1,3.36,.08,5.12,.1,1.18,2.31,3.47,1.01,4.53-.93,.76-2.25-3.83-2.23-4.49,.07-2.01-.54-3.71,.82-5.59,.51-.11,.53,.02,.31,.43">
                            </path>
                            <path id="ii" class="n" d="M266.75,1290.78c.16-.03,.3-.15,.34-.31,.86-3.31,1.89-4.1,1.89-4.11,.06-.04,.11-.1,.14-.17,2.15-4.75,2.38-10.15,.63-15.07-.06-.15-.19-.26-.35-.27-2.37-.23-4.57-2.48-6.5-4.47-.57-.59-1.12-1.15-1.65-1.64-.13-.12-.33-.15-.49-.06-.09,.05-.17,.1-.25,.16-.59-.44-1.3-.67-2.04-.65-2.31,0-4.84,1.93-5.81,2.77-.03,.03-.06,.06-.08,.1-.21,.33-.33,.56-.33,.57-.79,.98-1.37,1.19-1.71,1.19-.27,0-.52-.13-.68-.35-.02-.03-.04-.05-.06-.08-1.54-1.44-3.13-2.32-6.8-3.77-.03-.01-.06-.02-.1-.03-.29-.04-.58-.06-.87-.06-1.93,.06-3.76,.86-5.11,2.23-10.02,6.02-4.26,18.38-3,20.79,.03,.06,.08,.12,.14,.15,3.54,2.37,5.85,2.7,7.83,2.7,.88,0,1.77-.08,2.71-.15,.49-.04,.99-.08,1.53-.12,.05,0,.1-.02,.15-.04,1.94-.81,4.01-1.24,6.11-1.26,2-.04,3.97,.5,5.67,1.54,1.55,.53,3.18,.78,4.81,.71,1.31,0,2.61-.12,3.9-.33m-8.32-1.13c-1.82-1.11-3.92-1.68-6.06-1.64-2.19,.02-4.36,.47-6.38,1.31-.51,.03-1,.08-1.47,.12-.92,.08-1.79,.15-2.63,.15-1.83,0-3.97-.3-7.27-2.5-1.29-2.52-6.54-14.07,2.78-19.62,.04-.02,.07-.05,.1-.08,1.2-1.22,2.82-1.94,4.53-2.01,.24,0,.47,.02,.71,.05,3.5,1.39,5.02,2.23,6.46,3.56,.32,.42,.82,.67,1.35,.68,.76,0,1.56-.51,2.41-1.58,0,0,.11-.2,.31-.53,.77-.65,3.17-2.52,5.22-2.52,.65-.02,1.28,.22,1.75,.68,.09,.08,.2,.12,.31,.11,.12,0,.23-.06,.3-.15,.03-.03,.06-.06,.09-.08,.44,.42,.89,.89,1.37,1.38,1.96,2.02,4.18,4.3,6.75,4.68,1.57,4.61,1.33,9.65-.65,14.09-.32,.28-1.25,1.3-2.05,4.24-1.16,.18-2.32,.27-3.49,.28-1.5,.05-3-.16-4.43-.61">
                            </path>
                            <path id="ij" class="n" d="M254.76,1325.36c11.93-8.26,11.14-21.76,11.14-21.87-.05-5.44,.35-9.82,1.19-13.02,.04-.14,0-.28-.1-.39-.09-.11-.24-.16-.38-.13-1.24,.21-2.5,.31-3.76,.32-1.5,.05-3-.16-4.43-.61-1.82-1.11-3.92-1.68-6.06-1.64-2.19,.02-4.36,.47-6.38,1.31-.51,.03-1,.08-1.47,.12-.92,.08-1.79,.15-2.63,.15-1.84,0-4.01-.31-7.36-2.55-.19-.13-.45-.07-.58,.12-.08,.13-.09,.29-.02,.42,.18,.35,.29,.54,.3,.56,2.75,4.12,1.56,9.15,.31,14.47-1.67,7.1-3.56,15.14,4.33,21.95,1.16,1,2.08,1.13,2.65,.49,.73-.82,.54-2.73,.52-2.92-.5-8.92,3.99-13.06,4.03-13.1,.02-.02,.05-.05,.07-.08,1.68-2.42,3.28-3.7,4.63-3.7,1.69,0,2.59,2.04,2.61,2.08,2.36,4.83-3.84,16.2-3.9,16.31-.04,.07-.06,.16-.05,.24,.21,2.26,1.54,2.6,2.31,2.6h0c1.09-.1,2.14-.49,3.04-1.12m-.64-18.38c-.05-.1-1.12-2.57-3.37-2.57-1.65,0-3.43,1.35-5.29,4.02-.49,.46-4.78,4.72-4.27,13.76,.06,.56,.07,1.86-.31,2.29-.06,.08-.16,.12-.25,.12-.16,0-.54-.09-1.22-.68-7.5-6.48-5.75-13.93-4.06-21.13,1.2-5.12,2.35-9.98,.13-14.18,1.92,1.2,4.14,1.82,6.4,1.81,.88,0,1.77-.08,2.71-.15,.49-.04,.99-.08,1.53-.12,.05,0,.1-.02,.15-.04,1.94-.81,4.01-1.24,6.11-1.27,2-.04,3.97,.5,5.67,1.54,1.55,.53,3.18,.77,4.81,.71,1.09,0,2.19-.08,3.27-.23-.84,4.16-1.2,8.41-1.06,12.65,0,.13,.75,13.17-10.78,21.15-.76,.53-1.64,.86-2.57,.97-.54,0-1.28-.18-1.46-1.71,.7-1.3,6.3-11.96,3.87-16.94">
                            </path>
                            <path id="ik" class="n" d="M252.95,1268.09s.12-.23,.34-.58c.11-.18,.07-.4-.08-.54-.14-.12-.33-.14-.48-.04-1.78-1.8-3.44-2.71-4.92-2.71-.98,0-1.9,.43-2.53,1.17-.74-.4-1.55-.67-2.39-.79-.23-.03-.44,.13-.47,.36-.03,.19,.08,.37,.26,.44,3.53,1.4,5.07,2.24,6.51,3.58,.32,.42,.82,.67,1.35,.68,.76,0,1.56-.51,2.41-1.58m-5.14-3.03c1.26,0,2.8,.89,4.44,2.58-.63,.78-1.22,1.19-1.71,1.19-.27,0-.52-.13-.68-.35-.02-.03-.04-.05-.06-.08-1.13-1.04-2.43-1.89-3.84-2.51,.47-.54,1.15-.84,1.86-.84">
                            </path>
                            <path id="il" class="n" d="M269.7,1271.53c.09-.11,.11-.27,.06-.4-.04-.12-.09-.23-.14-.34-2.84-4.26-5.37-6.42-7.53-6.42-.46,0-.91,.11-1.31,.33-.2,.11-.28,.37-.16,.57,.02,.04,.05,.07,.08,.1,.51,.48,1.05,1.03,1.62,1.61,2.03,2.09,4.34,4.46,7.02,4.72h.04c.13,0,.25-.06,.33-.16m-7.61-6.33c1.01,0,3.18,.73,6.46,5.49-2.04-.6-3.94-2.55-5.64-4.3-.4-.41-.78-.8-1.15-1.16,.11-.02,.22-.03,.33-.03">
                            </path>
                        </g>
                        
                        
                        
                        <g id="IPR_UR7" ${IPRArray.UR7.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="kt" class="mw" d="M225.54,1210.66s-7.61,17.7-1.31,23.71c0,0,1.83,4.65,12.02,1.36,0,0,7.37-3.66,11.83,.14,0,0,5.87,4.98,12.58,.61,0,0,8.93-9.92,.61-30.15,0,0-5.88-11.2-4.58-18.32,0,0,.81-15.74-2.54-20.33,0,0-6.2-11.16-9.67-13.57,0,0-4.58-3.1-5.14,1.92,0,0-.62,1.61,1.74,6.07,0,0,1.36,7,.5,12.21,0,0-1.05,9.48-1.49,10.91,0,0-.5,4.83-2.79,.25,0,0-7.13-14.63-9.36-16.49,0,0-5.95-8.86-7.75-9.61,0,0-12.53-8.12,1.12,16.8,0,0,4.27,8.49,3.66,12.7,0,0-.62,5.46,.74,9.11,0,0,1.39,8.43-.17,12.66">
                            </path>
                            <path id="ku" class="my" d="M237.29,1185.45c2.29,4.59,2.79-.25,2.79-.25,.43-1.43,1.49-10.91,1.49-10.91,.15-.97,.24-1.95,.27-2.94-2.58-3.04-5.82-6.37-5.82-6.37-4.79-8.32-8.47-7.29-8.47-7.29-3.76,.96-.17,9.48,.47,11.35,2.33,2.16,9.27,16.4,9.27,16.4">
                            </path>
                            <path id="kv" class="mk" d="M262.36,1209.22c-.33-.93-.69-1.89-1.09-2.88,0,0-.08-.16-.23-.44-4.31-1.57-9.09-1.19-13.09,1.05-4,2.62-7.07,1.42-7.07,1.42-6.79-2.46-11.74-1.3-14.86,.29-.1,.68-.26,1.35-.49,2,0,0-.13,.3-.34,.84-1.41,3.57-6.45,17.65-.98,22.88,0,0,1.83,4.65,12.02,1.36,0,0,7.37-3.66,11.83,.14,0,0,5.87,4.98,12.58,.61,0,0,8.08-8.98,1.7-27.27">
                            </path>
                            <path id="kw" class="nb" d="M236.21,1235.74c2.08-.97,4.33-1.51,6.62-1.59,1.89-.07,3.74,.54,5.21,1.73,1.92,1.49,4.26,2.33,6.69,2.4,1.46-1.33-.51-1.52-.51-1.52-2.65-.69-5.15-1.84-7.39-3.41-6.28-5.4-15.81,5.48-20.08,1.84l1.32,1.58c.83,.3,.57,.16,1.95,.13,2.11-.09,4.19-.48,6.18-1.17">
                            </path>
                            <path id="kx" class="mx" d="M240.56,1189.82c1.73,3.13,3,6.49,3.77,9.98,.35,1.76,.55,3.54,.6,5.34,.01,1.08-1.21,3.02-2.3,1.32-.51-.8-.02-2.4,0-3.19,.05-1.82-.1-3.64-.45-5.42-.3-1.82-.76-3.62-1.39-5.36-.25-.74-.53-1.48-.84-2.2-.15-.34,.25-1.11,.62-.48">
                            </path>
                            <path id="ky" class="mx" d="M242.83,1153.43c.81,.61,1.54,1.33,2.17,2.14,.85,1.02,1.64,2.09,2.39,3.19,1.44,2.08,2.78,4.24,4.06,6.42,.33,.56,.65,1.12,.97,1.69,.35,.55,.65,1.13,.92,1.73,.84,2.35,1.34,4.8,1.47,7.29,.35,3.8,.42,7.63,.23,11.44-.03,.57-.16,1.14-.18,1.72-.03,.8,0,1.6,.09,2.39,.19,1.67,.52,3.32,.99,4.93,.78,2.7,1.77,5.32,2.97,7.86,.13,.28,.27,.56,.41,.84,.08,.17,.13,.37,.32,.42,.48,.12,.95,.27,1.42,.43-1.04-2.11-1.95-4.28-2.71-6.51-1.06-3.08-1.94-6.39-1.82-9.67,.03-.7,.17-1.38,.2-2.08,.03-.65,.04-1.31,.05-1.96,.04-2.36,0-4.72-.14-7.07-.1-2.62-.47-5.23-1.11-7.77-.25-1-.64-1.96-1.16-2.84-.23-.36-.44-.71-.64-1.08-1.11-1.94-2.28-3.85-3.5-5.73-1.35-2.22-2.92-4.29-4.7-6.18-.76-.8-1.73-1.38-2.8-1.65,.04,.02,.08,.05,.11,.07">
                            </path>
                            <path id="l" class="nc" d="M261.96,1212.7c.42,1.83,.74,3.68,.94,5.55,.25,1.92,.31,3.87,.17,5.81-.19,3.18-1.02,6.3-2.42,9.16-.44,.92-.99,1.79-1.64,2.57-.14,.12-.3,.22-.47,.29-.23,.13-.46,.26-.69,.38-.44,.22-.9,.42-1.36,.58-.41,.09-.82,.22-1.21,.39,0,.34-.31,.64-.53,.85,1.92,.02,3.81-.5,5.45-1.5,.35-.19,.65-.47,.87-.81,.44-.62,.84-1.27,1.19-1.95,1.71-3.46,2.58-7.27,2.56-11.12,.05-5.68-1.4-11.17-3.48-16.41-.08-.2-.19-.39-.28-.59-.51-.18-1.02-.33-1.54-.47,.16,.37,.29,.75,.4,1.14,.28,.83,.56,1.65,.84,2.48,.41,1.2,.91,2.41,1.22,3.64,.03,.11-.04-.17,0,0">
                            </path>
                            <path id="la" class="nc" d="M247.39,1210.07c3.03,3.79,2.6,9.29,.48,13.39-.53,1.02-1.15,2-1.84,2.93-.18,.24-.36,.61-.73,.56-.43-.06-.45-.48-.27-.76,1.26-1.97,2.1-4.17,2.48-6.47,.41-2.37,0-4.81-1.18-6.91-.25-.39-.54-.75-.87-1.08-.31-.28-.45-.71-.39-1.12,.19-.72,.92-1.15,1.63-.96,.27,.07,.51,.22,.69,.43">
                            </path>
                            <path id="lb" class="n" d="M260.91,1236.41s.06-.05,.08-.08c.09-.1,9-10.35,.67-30.62-.06-.11-5.8-11.15-4.53-18.11,.03-.65,.77-15.94-2.59-20.55-.25-.46-6.29-11.27-9.8-13.72-.89-.59-1.92-.94-2.98-1.01-1.11,0-2.5,.56-2.81,3.2-.11,.38-.43,2.16,1.75,6.3,.13,.69,1.29,7.18,.48,12.02-.36,3.27-1.14,9.73-1.49,10.91-.09,.92-.43,1.85-.68,1.85-.02,0-.46-.02-1.32-1.74-.29-.6-7.1-14.54-9.42-16.58-.75-1.12-6.07-8.95-7.84-9.68-.08-.05-2.07-1.33-3.7-1.33-.74-.05-1.44,.32-1.82,.95-1.28,2.17,.69,7.97,6.03,17.72,.04,.08,4.21,8.42,3.62,12.47-.02,.23-.62,5.6,.75,9.23,.01,.08,1.35,8.36-.14,12.43-.31,.73-7.6,17.93-1.28,24.13,.24,.49,1.56,2.71,5.98,2.71,2.24-.07,4.46-.48,6.57-1.22,2.03-.94,4.23-1.47,6.46-1.54,1.78-.07,3.53,.51,4.91,1.63,2.03,1.59,4.52,2.46,7.09,2.5,2.14-.02,4.22-.67,5.99-1.86m-24.77-1.5c-2.02,.7-4.13,1.09-6.26,1.16-4.25,0-5.21-2.18-5.24-2.27-.02-.06-.06-.11-.1-.15-6.01-5.74,1.34-23.07,1.42-23.27,1.58-4.29,.24-12.53,.17-12.95-1.31-3.52-.73-8.87-.72-8.91,.63-4.29-3.52-12.6-3.7-12.97-6.72-12.26-6.68-15.85-6.05-16.91,.23-.37,.66-.58,1.1-.54,1.38,0,3.23,1.18,3.31,1.23,1.23,.51,5.2,5.93,7.56,9.45,.02,.03,.05,.06,.08,.09,1.71,1.42,6.8,11.32,9.25,16.35,.76,1.53,1.4,2.21,2.07,2.21,1.15,0,1.44-1.99,1.49-2.52,.44-1.45,1.46-10.59,1.5-10.96,.87-5.22-.44-12.07-.5-12.36,0-.04-.02-.08-.04-.11-2.19-4.15-1.72-5.72-1.71-5.73,.01-.03,.02-.07,.03-.1,.19-1.68,.83-2.49,1.98-2.49,.9,.08,1.76,.38,2.51,.87,3.35,2.33,9.48,13.32,9.57,13.48,3.22,4.42,2.47,19.91,2.47,20.01-1.31,7.19,4.38,18.13,4.6,18.56,7.85,19.09,.08,28.97-.5,29.67-1.62,1.09-3.53,1.67-5.49,1.69-2.37-.05-4.67-.86-6.55-2.31-1.54-1.25-3.47-1.9-5.45-1.83-2.35,.06-4.65,.61-6.78,1.61">
                            </path>
                            <path id="lc" class="n" d="M240.5,1184.9c.44-1.44,1.46-10.59,1.5-10.96,.16-.99,.25-1.99,.28-2.99,0-.1-.03-.21-.1-.28-2.4-2.84-5.43-5.97-5.8-6.35-4.9-8.49-8.79-7.48-8.91-7.44-.68,.16-1.26,.61-1.58,1.24-1.28,2.42,.59,7.49,1.49,9.93,.11,.29,.2,.54,.26,.72,.02,.07,.06,.12,.11,.17,2.24,2.09,9.11,16.14,9.18,16.29,.76,1.52,1.4,2.21,2.07,2.21h0c1.15,0,1.44-1.99,1.49-2.52m-12.32-17.15c-.79-2.14-2.64-7.15-1.54-9.25,.21-.42,.59-.72,1.04-.82,.1-.02,.2-.03,.31-.03,.84,0,3.89,.51,7.69,7.12,.02,.03,.04,.06,.06,.08,.03,.03,3.17,3.26,5.69,6.22-.03,.92-.12,1.84-.26,2.75-.36,3.27-1.14,9.73-1.49,10.91-.1,.92-.44,1.85-.68,1.85-.02,0-.46-.02-1.32-1.74-.28-.58-6.86-14.04-9.28-16.46-.06-.17-.14-.39-.23-.64">
                            </path>
                            <path id="ld" class="n" d="M260.92,1236.41s.06-.05,.08-.08c.34-.38,8.17-9.37,1.79-27.69-.34-.97-.71-1.94-1.12-2.93,0,0-.08-.16-.22-.43-.05-.1-.13-.17-.24-.21-1.78-.64-3.65-.97-5.54-.97-2.78-.03-5.51,.69-7.92,2.07-1.46,1.02-3.19,1.58-4.98,1.63-.58,.01-1.16-.07-1.72-.25-5.59-2.03-10.85-1.91-15.19,.31-.12,.06-.2,.17-.23,.31-.09,.65-.25,1.28-.46,1.9,0,0-.13,.31-.34,.85-1.62,4.11-6.44,17.89-.93,23.28,.24,.49,1.56,2.71,5.98,2.71,2.24-.07,4.46-.48,6.58-1.22,2.03-.94,4.23-1.47,6.46-1.54,1.78-.07,3.53,.51,4.91,1.63,2.03,1.58,4.52,2.46,7.09,2.5,2.14-.02,4.22-.67,5.99-1.86m-24.77-1.5c-2.02,.7-4.13,1.09-6.26,1.16-4.25,0-5.21-2.18-5.24-2.27-.02-.06-.06-.11-.1-.15-5.35-5.12-.04-19.57,1.08-22.42,.21-.53,.33-.82,.34-.84,.21-.61,.37-1.23,.48-1.86,4.1-2.02,9.05-2.09,14.33-.18,.65,.21,1.33,.32,2.01,.3,1.94-.04,3.83-.65,5.43-1.76,2.28-1.28,4.85-1.95,7.47-1.94,1.74,0,3.46,.29,5.1,.87,.08,.17,.13,.26,.14,.27,.39,.94,.75,1.9,1.08,2.86,6,17.22-1.04,26.15-1.59,26.81-1.62,1.09-3.53,1.67-5.49,1.69-2.37-.05-4.67-.86-6.55-2.31-1.54-1.25-3.48-1.9-5.46-1.83-2.35,.06-4.65,.61-6.78,1.61">
                            </path>
                            <path id="le" class="n" d="M255.04,1238.16c.56-.51,.78-.99,.63-1.42-.23-.68-1.19-.8-1.33-.81-2.58-.68-5.02-1.8-7.21-3.32-1.24-1.09-2.84-1.67-4.49-1.64-2.58,0-5.24,1.17-7.81,2.3-2.16,.95-4.2,1.84-5.82,1.84-.71,.03-1.41-.21-1.95-.66-.18-.15-.44-.13-.59,.05-.13,.16-.13,.38,0,.54l1.32,1.58c.05,.06,.11,.1,.18,.13,.38,.18,.81,.25,1.23,.2,.19-.01,.45-.03,.87-.04,2.17-.09,4.31-.5,6.36-1.22,2.03-.94,4.23-1.47,6.46-1.54,1.78-.07,3.53,.51,4.91,1.63,1.99,1.56,4.43,2.43,6.96,2.5h0c.1,0,.2-.04,.28-.11m-18.94-3.25c-1.95,.68-3.99,1.06-6.05,1.15-.44,0-.71,.03-.91,.04-.27,.05-.54,0-.79-.11l-.08-.1c.25,.04,.49,.06,.74,.06,1.8,0,3.91-.93,6.15-1.91,2.5-1.09,5.08-2.22,7.48-2.22,1.46-.03,2.88,.49,3.97,1.45,2.3,1.61,4.87,2.8,7.59,3.49,.25,0,.48,.09,.67,.25,0,0,0,.13-.28,.43-2.27-.12-4.45-.92-6.26-2.3-1.55-1.26-3.5-1.91-5.49-1.83-2.34,.07-4.63,.62-6.75,1.61">
                            </path>
                        </g>
                        <g id="IPR_UR6" ${IPRArray.UR6.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="kh" class="mw" d="M293.84,1211.25s-10.24,13.87,1.49,25.74c0,0,1.72,3.24,9.65-.55,0,0,6.92-5.61,13.83-1.38,0,0,6.31,3.23,12.39-.34,0,0,3.21-.77,3.81-7.45,0,0-.2-11.54-7.52-21.13,0,0,.28-3.95,.26-7.65,0,0,1.75-16.6-6.68-30.93-1.49-2.85-2.35-5.99-2.53-9.2,0,0,.19-5.9-3.76-3.89,0,0-2.25,.23-2.64,5.41-.05,1.24,.13,2.48,.52,3.66,0,0,1.59,4.02,1.46,6.94,0,0,.62,9.56-1.85,15.66,0,0-.9,5.22-3.05,.91-1.84-3.26-4-6.32-6.45-9.14,0,0-3.99-4.83-6.22-7-2.08-1.91-3.49-4.45-4.02-7.23,0,0-1.43-4.54-1.72-5.74,0,0-.97-4.28-3.89-2.92,0,0-2.17,.23-1.91,6.48,0,0-.13,3.11,2.3,8.95,0,0,7.68,13.28,9.04,22.66,0,0,.16,5.45-1.17,8.14,0,0-2.73,6.29-1.35,10.02">
                            </path>
                            <path id="ki" class="my" d="M312.27,1186.15s-.9,5.22-3.05,.91c-1.84-3.25-4-6.32-6.45-9.14,0,0-1.6-1.94-3.34-3.91l-.15-.17h0c-.04-.3-1.67-13.69-2.26-15.95,0,0-1.75-6.91,4.03-6.11,0,0,2.28-.07,4.1,5.37,0,0,3.05,10.25,8.98,13.35,0,0,.61,9.56-1.85,15.65">
                            </path>
                            <path id="kj" class="mk" d="M335,1227.27c-.59,6.69-3.81,7.45-3.81,7.45-6.07,3.56-12.39,.34-12.39,.34-6.91-4.23-13.83,1.39-13.83,1.39-7.93,3.79-9.65,.55-9.65,.55-7.54-7.62-6.01-16.08-3.95-21.14,.48-1.18,1.04-2.32,1.69-3.41,3.42-2.41,8.31-4.84,13.09-3.62,0,0,5.44,1.81,10.01-.87,3.94-1.56,8.3-1.69,12.33-.39,.4,.59,.78,1.18,1.13,1.77,3.17,5.48,5.01,11.63,5.37,17.95">
                            </path>
                            <path id="kk" class="nb" d="M329.4,1228.74l-.16,.79c-.21,1.01-.65,1.95-1.29,2.76-.08,.1-.17,.18-.24,.26-.28,.3-.64,.53-1.03,.66-4.6,2.7-9.39,.25-9.39,.25-.52-.32-1.07-.58-1.64-.77-4.52-1.54-8.63,1.66-8.84,1.82h0c-.28,.14-.55,.26-.8,.37-.11,.05-.21,.09-.32,.13-1.21,.55-2.53,.86-3.86,.9-1.83-.02-2.34-.98-2.34-.98-.17-.18-.34-.35-.5-.53,1.25-1.13,3.77-2.13,8.91-1.63,2.3-.76,4.38-2.06,6.08-3.79,0,0,1.52-2.61,5.71,1.28,1.01,.43,2.08,.68,3.18,.74,1.02,.07,2.03-.16,2.91-.68,.62-.4,1.12-.95,1.47-1.6,0,0,.56-1.49,2.18,0">
                            </path>
                            <path id="kl" class="mx" d="M311.65,1190.86c1.45,3.23,2.43,6.65,2.89,10.16,.2,1.77,.24,3.56,.13,5.34-.08,1.07-1.47,2.91-2.4,1.15-.44-.83,.19-2.38,.28-3.16,.21-1.8,.22-3.61,.02-5.4-.14-1.83-.45-3.64-.92-5.41-.18-.75-.39-1.5-.65-2.24-.12-.34,.35-1.08,.66-.43">
                            </path>
                            <path id="km" class="mx" d="M316.93,1157.62c.18,3.21,1.04,6.35,2.53,9.21,8.43,14.33,6.68,30.92,6.68,30.92,.02,3.7-.26,7.65-.26,7.65,.45,.59,.87,1.18,1.26,1.77,.51,.11,1.02,.25,1.55,.41-.3-.5-.64-.98-1.02-1.42,0,0,.28-3.95,.26-7.65,0,0,1.75-16.6-6.68-30.92-1.49-2.86-2.35-5.99-2.53-9.21,0,0,.15-4.67-2.6-4.28,.89,1.24,.81,3.51,.81,3.51">
                            </path>
                            <path id="kn" class="nc" d="M331.38,1234.75c1.07-.43,1.94-1.26,2.42-2.3,.71-1.37,1.15-2.87,1.3-4.41,.11-1.61,0-3.23-.35-4.81-.49-3.01-1.31-5.97-2.44-8.8-.55-1.38-1.18-2.72-1.89-4.02-.38-.7-.79-1.39-1.22-2.05-.1-.15-.19-.29-.29-.44-.07-.11-.14-.21-.22-.31-.09-.1-.14-.06-.27-.1-.43-.13-.85-.24-1.29-.33,2.24,3.43,3.9,7.2,4.94,11.16,.51,1.9,.89,3.84,1.13,5.79,.1,.76,.17,1.54,.19,2.31-.01,.77-.12,1.54-.32,2.29-.4,1.87-1.23,4.09-3.02,5.07-.13,.07-.27,.14-.41,.18-.02,0-.04,0-.06,.02-.5,.3-1.03,.56-1.57,.78-1.8,.72-3.75,1.01-5.69,.86-1.25-.09-2.48-.33-3.67-.73,1.63,.86,3.42,1.36,5.26,1.48,2.6,.24,5.2-.33,7.46-1.63">
                            </path>
                            <path id="ko" class="nc" d="M313.29,1211.5c-.5,1.89,.12,3.71,.82,5.45,.43,.97,.8,1.96,1.11,2.97,.33,.88,.25,1.87-.23,2.68-.44,.61-1.25,.91-1.43,1.68-.18,.77,.29,1.54,1.06,1.74,.77,.14,1.54-.2,1.95-.86,.62-.69,1.05-1.52,1.25-2.43,.5-2.43-1.06-4.58-2.26-6.54-.66-.95-1.16-2.02-1.46-3.14-.1-.46-.12-.93-.08-1.4,.04-.45-.61-.66-.73-.17">
                            </path>
                            <path id="kp" class="n" d="M305.16,1237.11s.06-.03,.08-.05c2.33-1.75,5.13-2.75,8.04-2.87,1.89,0,3.74,.53,5.34,1.53,1.97,.91,4.12,1.38,6.3,1.38,2.26,.02,4.49-.57,6.45-1.71,.51-.16,3.48-1.35,4.06-7.85,0-.12-.28-11.69-7.51-21.26,.05-.77,.27-4.26,.25-7.48,.02-.17,1.67-16.9-6.73-31.17-1.45-2.79-2.29-5.85-2.48-8.99,0-.11,.08-2.82-1.15-4.08-.76-.79-1.85-.87-3.17-.23-.47,.1-2.55,.83-2.92,5.75-.06,1.31,.13,2.62,.54,3.87,.02,.04,1.55,3.97,1.43,6.81,0,.1,.58,9.54-1.82,15.47-.01,.03-.02,.06-.02,.09-.19,1.07-.68,2.27-1.06,2.27-.08,0-.5-.08-1.19-1.47-1.86-3.28-4.04-6.37-6.5-9.22-.16-.2-4.03-4.87-6.28-7.06-2.01-1.87-3.37-4.34-3.89-7.03-.01-.05-1.43-4.54-1.71-5.71-.03-.14-.83-3.51-3.21-3.51-.42,0-.84,.1-1.22,.28-.48,.1-2.46,.88-2.21,6.87,0,.13-.11,3.27,2.36,9.17,.08,.13,7.66,13.32,8.99,22.47,0,.05,.15,5.37-1.13,7.96-.11,.26-2.68,6.27-1.43,10.12-1.16,1.7-9.44,14.83,1.62,26.06,.19,.29,1.09,1.45,3.52,1.45,2.33-.14,4.59-.78,6.65-1.88m-14.76-78.8c.29,1.2,1.67,5.58,1.71,5.71,.53,2.87,1.99,5.49,4.14,7.46,2.19,2.13,6.15,6.92,6.21,6.98,2.42,2.8,4.56,5.83,6.39,9.05,.66,1.32,1.28,1.94,1.95,1.94,1.28,0,1.77-2.34,1.88-2.92,2.45-6.11,1.89-15.4,1.86-15.75,.13-2.97-1.42-6.94-1.47-7.07-.37-1.13-.54-2.33-.5-3.52,.35-4.69,2.25-5.02,2.26-5.02,.05,0,.1-.02,.15-.04,.98-.5,1.72-.5,2.24,.03,.98,1.01,.91,3.45,.91,3.5,.18,3.28,1.06,6.49,2.59,9.4,8.26,14.04,6.64,30.51,6.62,30.72,.03,3.64-.25,7.58-.26,7.62,0,.1,.02,.2,.08,.29,7.15,9.37,7.43,20.77,7.44,20.84-.55,6.25-3.46,7.08-3.49,7.08-.04,0-.08,.02-.11,.05-1.84,1.08-3.94,1.64-6.07,1.62-2.03,0-4.04-.44-5.89-1.28-1.73-1.07-3.72-1.64-5.75-1.64-3.08,.1-6.06,1.16-8.52,3.02-1.93,1.03-4.06,1.64-6.24,1.78-2.18,0-2.79-1.03-2.82-1.07-.02-.04-.05-.07-.08-.1-11.34-11.47-1.86-24.64-1.45-25.2,.08-.11,.1-.26,.06-.39-1.31-3.52,1.31-9.65,1.33-9.69,1.36-2.75,1.22-8.11,1.2-8.38-1.36-9.35-9.02-22.68-9.07-22.76-2.36-5.66-2.27-8.74-2.27-8.8-.24-5.66,1.54-6.05,1.54-6.05,.05,0,.09-.02,.13-.04,.29-.14,.6-.22,.92-.23,1.71,0,2.38,2.83,2.39,2.87">
                            </path>
                            <path id="kq" class="n" d="M312.67,1186.56c2.45-6.11,1.89-15.4,1.86-15.8,0-.15-.1-.28-.23-.34-5.7-2.98-8.74-12.99-8.77-13.11-1.82-5.44-4.17-5.66-4.43-5.66h0c-1.75-.24-3.06,.16-3.86,1.2-1.49,1.92-.66,5.29-.63,5.43,.52,1.97,1.84,12.56,2.24,15.76v.08c.01,.1,.05,.2,.12,.28l.15,.17c1.71,1.94,3.31,3.88,3.34,3.91,2.42,2.8,4.56,5.83,6.39,9.05,.66,1.32,1.28,1.94,1.95,1.94,1.28,0,1.78-2.34,1.88-2.92m-13-12.62c-.39-3.21-1.73-13.85-2.25-15.87,0-.03-.77-3.12,.48-4.71,.56-.66,1.4-1.01,2.26-.94,.3,0,.59,.02,.89,.07,.02,0,2.03,.1,3.69,5.07,.12,.42,3.1,10.22,8.97,13.49,.08,1.49,.36,9.83-1.83,15.24-.01,.03-.02,.06-.02,.09-.19,1.07-.68,2.27-1.06,2.27-.08,0-.5-.07-1.2-1.48-1.86-3.28-4.03-6.37-6.5-9.22-.02-.02-1.63-1.96-3.35-3.92l-.07-.08h0Z">
                            </path>
                            <path id="kr" class="n" d="M305.16,1237.12s.06-.03,.08-.05c2.33-1.75,5.13-2.75,8.04-2.87,1.89,0,3.74,.53,5.34,1.53,1.97,.91,4.12,1.39,6.3,1.38,2.26,.02,4.49-.57,6.44-1.71,.51-.16,3.49-1.35,4.06-7.85-.37-6.39-2.23-12.61-5.43-18.15-.39-.65-.76-1.24-1.14-1.79-.05-.08-.13-.13-.22-.16-1.87-.59-3.81-.89-5.77-.89-2.36-.03-4.71,.42-6.9,1.32-1.71,.97-3.64,1.45-5.61,1.41-1.38,0-2.76-.19-4.08-.58-3.98-1.02-8.58,.25-13.44,3.68-.05,.03-.09,.08-.12,.13-.66,1.11-1.23,2.27-1.72,3.47-1.88,4.63-3.86,13.58,4,21.57,.19,.29,1.09,1.45,3.52,1.45,2.32-.14,4.59-.78,6.65-1.88m-1.64-27.92c.85,0,1.7,.1,2.52,.31,1.4,.42,2.86,.62,4.32,.62,2.1,.04,4.17-.48,6-1.51,2.07-.83,4.28-1.25,6.51-1.22,1.82,0,3.64,.28,5.38,.81,.34,.5,.68,1.04,1.03,1.63,3.11,5.41,4.93,11.47,5.31,17.7-.55,6.25-3.46,7.08-3.48,7.08-.04,0-.08,.02-.12,.05-1.84,1.08-3.94,1.64-6.07,1.62-2.03,0-4.04-.44-5.89-1.28-1.73-1.07-3.72-1.64-5.75-1.64-3.08,.1-6.06,1.16-8.52,3.02-1.93,1.03-4.06,1.64-6.24,1.78-2.18,0-2.79-1.03-2.82-1.07-.02-.04-.04-.07-.08-.1-7.19-7.27-6.06-15.26-3.85-20.69,.46-1.13,1-2.23,1.62-3.28,2.5-1.75,6.26-3.82,10.13-3.82">
                            </path>
                            <path id="ks" class="n" d="M305.81,1235.7c.11-.04,.22-.09,.33-.14,.26-.11,.54-.24,.83-.38,.03-.01,.06-.03,.08-.06,1.74-1.31,3.85-2.06,6.03-2.15,.82,0,1.64,.13,2.42,.4,.55,.19,1.09,.44,1.59,.75,1.51,.7,3.16,1.06,4.82,1.06,1.73,.01,3.43-.44,4.93-1.3,.44-.16,.83-.42,1.16-.75,.09-.09,.17-.18,.27-.29,.69-.86,1.16-1.87,1.39-2.95l.16-.79c.03-.14-.02-.29-.13-.39-.41-.44-.97-.71-1.57-.77-.56,.01-1.06,.36-1.26,.88-.31,.59-.77,1.09-1.33,1.45-.73,.43-1.56,.64-2.4,.62-.09,0-.18,0-.26,0-1.02-.06-2.02-.29-2.96-.68-1.59-1.46-3.01-2.2-4.23-2.2-.81-.02-1.57,.36-2.04,1.01-1.63,1.63-3.61,2.87-5.8,3.62-4.34-.41-7.43,.19-9.15,1.75-.08,.07-.13,.18-.14,.29,0,.11,.04,.22,.11,.3,.15,.17,.31,.33,.47,.5,.17,.25,.86,1.11,2.66,1.14h.08c1.36-.06,2.69-.37,3.93-.93m2.02-2.21c.05,0,.1,0,.15-.01,.02,0,.14-.04,.32-.1-.61,.31-1.18,.67-1.73,1.07-.26,.13-.52,.24-.76,.35-.1,.04-.2,.09-.31,.13-1.14,.52-2.37,.81-3.62,.87v.42l-.07-.42c-1.53-.02-1.96-.73-1.97-.75-.02-.04-.05-.07-.08-.1-.06-.06-.12-.13-.18-.19,1.61-1.19,4.42-1.63,8.26-1.26m9.66-.08c-.54-.33-1.12-.61-1.73-.81-1.9-.58-3.93-.55-5.81,.09,1.6-.79,3.05-1.83,4.31-3.1,.02-.03,.04-.05,.06-.08,.31-.43,.82-.67,1.35-.65,1,0,2.28,.7,3.71,2.02,.03,.03,.07,.06,.11,.08,1.06,.45,2.19,.71,3.33,.78,.1,0,.2,0,.3,0,1,.03,1.99-.23,2.85-.75,.69-.45,1.26-1.07,1.63-1.8,0-.02,.16-.4,.51-.4,.31,.03,.6,.17,.83,.39l-.11,.54c-.2,.94-.61,1.83-1.2,2.59-.08,.09-.15,.17-.23,.24-.23,.25-.52,.44-.83,.55h0s-.08,.03-.12,.05c-1.38,.81-2.95,1.23-4.55,1.21-1.52,0-3.02-.33-4.41-.95">
                            </path>
                        </g>
                        
                        <g id="IPR_UR5" ${IPRArray.UR5.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="lm" class="mw" d="M379.44,1233.14c-8.17,10.16-13.2,2.14-13.2,2.14-10.35-1.27-6.76-15.69-6.76-15.69-.1-1.33,.56-3.79,1.1-5.55,.37-1.19,.68-2.06,.68-2.06,0-.24,.02-.55,.04-.91,.16-2.95,.74-9.51,.81-9.78,.08-.3-.2-15.52-.2-15.52-.33-3.09,.97-11.61,.97-11.61,.2-.57-.03-5.99-.03-5.99-.2-1.54-.26-3.1-.18-4.66-1.2-4.82,1.33-5.56,1.33-5.56,3.42-1.77,4.55,1.35,4.55,1.35,3.54,7.06,9.98,40.86,9.98,40.86,.66,2.81,1.76,6.86,2.77,10.48,.36,1.3,.72,2.55,1.03,3.65,.75,2.63,1.3,4.51,1.33,4.61,1.89,7.12-4.23,14.23-4.23,14.23">
                            </path>
                            <path id="ln" class="mk" d="M379.44,1233.14c-8.17,10.16-13.2,2.14-13.2,2.14-10.35-1.27-6.76-15.69-6.76-15.69-.1-1.33,.56-3.79,1.1-5.55,.37-1.19,.68-2.06,.68-2.06,0-.24,.02-.55,.04-.91,4.04-4.32,12.45-10.8,20-.42,.36,1.3,.72,2.55,1.03,3.65,.75,2.63,1.3,4.51,1.33,4.61,1.89,7.12-4.23,14.23-4.23,14.23">
                            </path>
                            <path id="lo" class="mw" d="M378.55,1200.16c.66,2.81,1.76,6.86,2.77,10.48,.37,1.3,.72,2.54,1.04,3.65,.75,2.63,1.3,4.51,1.33,4.61,.23,.87,.35,1.76,.36,2.66,0-.9-.13-1.79-.36-2.66-.02-.1-.58-1.98-1.33-4.61-.32-1.11-.67-2.35-1.04-3.65-1.01-3.62-2.11-7.67-2.77-10.48,0,0-6.44-33.8-9.98-40.86,0,0-.03-.08-.09-.19,.03,.06,.06,.13,.09,.2,3.54,7.06,9.98,40.86,9.98,40.86">
                            </path>
                            <path id="lp" class="mx" d="M376.76,1199.39c.54,2.33,1.39,5.52,2.25,8.6,.85,.81,1.63,1.69,2.31,2.65-1.01-3.62-2.11-7.67-2.77-10.48,0,0-6.44-33.8-9.98-40.86-.03-.07-.06-.13-.09-.2,0,0,0-.02-.01-.03-.02-.03-.03-.06-.05-.1-.01-.02-.03-.05-.04-.08,0-.01-.02-.03-.03-.05-.02-.04-.05-.08-.08-.13,0-.01-.01-.02-.02-.03-.03-.04-.06-.09-.09-.13,0,0-.01-.02-.02-.03-.04-.05-.08-.11-.13-.16l-.02-.02c-.05-.05-.09-.11-.15-.16h0c-.05-.06-.11-.11-.17-.17l-.02-.02c-.13-.11-.27-.21-.42-.29h-.03c-.16-.1-.33-.17-.51-.22h-.04c-.2-.06-.4-.09-.6-.1,0,0-.02,0-.03,0,.32,.32,.58,.7,.75,1.13,3.54,7.06,9.98,40.86,9.98,40.86">
                            </path>
                            <path id="lq" class="nc" d="M384.04,1221.56c-.01-.9-.13-1.79-.36-2.66-.02-.1-.58-1.98-1.33-4.61-.32-1.11-.67-2.35-1.03-3.65-.68-.95-1.46-1.84-2.31-2.65,.18,.63,.35,1.26,.53,1.88,.36,1.3,.72,2.54,1.03,3.65,.75,2.63,1.31,4.51,1.33,4.61,1.89,7.12-4.23,14.23-4.23,14.23-3.85,4.78-7,5.54-9.26,4.99,1.32,.86,2.95,1.13,4.48,.75h0c.11-.03,.23-.06,.35-.1h0c.38-.12,.75-.26,1.1-.43h0c.12-.06,.24-.12,.36-.19,0,0,.02-.01,.03-.02,.12-.07,.25-.14,.38-.22h0c.42-.25,.82-.53,1.2-.84l.04-.03c.12-.1,.25-.2,.38-.31,.01-.01,.02-.02,.04-.03,.42-.36,.84-.76,1.28-1.22l.04-.05c.13-.14,.26-.28,.39-.42,.02-.02,.04-.04,.06-.07,.14-.15,.28-.31,.42-.48l.02-.02c.15-.18,.31-.37,.46-.56,0,0,4.68-5.44,4.58-11.57">
                            </path>
                            <path id="lr" class="nc" d="M364.86,1210.1c-.14,.95-.45,1.79-.66,2.71-.26,1.18-.36,2.38-.29,3.58,.16,2.14,.53,4.26,1.09,6.33,.32,1.28,.7,2.57,1.11,3.84,.16,.49,.32,.99,.47,1.48,.15,.46,.7,.68,.79,.23-.01-.35-.08-.7-.21-1.03-.16-.63-.33-1.27-.48-1.9-.29-1.29-.58-2.57-.78-3.85-.41-2.6-.67-5.27,.03-7.46,.2-.62,.47-1.18,.67-1.79,.18-.43,.29-.89,.3-1.36-.09-1.35-1.85-2.02-2.03-.77">
                            </path>
                            <path id="ls" class="n" d="M379.76,1233.41c.26-.3,6.24-7.36,4.32-14.61,0-.04-.1-.33-.24-.84-.23-.81-.62-2.15-1.09-3.79-.32-1.11-.67-2.35-1.03-3.65-1.29-4.61-2.22-8.13-2.76-10.44-.26-1.38-6.49-33.94-10-40.92-.47-1.26-1.66-2.12-3.01-2.17-.72,.02-1.43,.21-2.06,.56-.12,.04-2.88,.91-1.63,6.01-.08,1.55-.02,3.1,.18,4.63,.13,1.97,.15,3.94,.04,5.9-.05,.35-1.3,8.61-.98,11.68,.11,5.94,.26,14.95,.22,15.4-.09,.34-.68,7.01-.83,9.87-.02,.34-.03,.63-.03,.86-.08,.23-.35,1-.66,2.01-.56,1.81-1.2,4.25-1.13,5.64-.2,.83-1.84,8.24,1.28,12.79,1.31,1.88,3.38,3.09,5.66,3.32,.47,.66,2.37,3.03,5.47,3.03,2.68,0,5.47-1.78,8.29-5.29m-11.58-73.92c3.47,6.92,9.88,40.41,9.95,40.77,.55,2.35,1.48,5.88,2.77,10.5,.37,1.3,.72,2.55,1.04,3.66,.47,1.64,.86,2.98,1.09,3.79,.14,.48,.22,.76,.24,.81,1.8,6.82-4.08,13.78-4.15,13.86-2.66,3.31-5.23,4.99-7.65,4.99-3.06,0-4.86-2.78-4.87-2.81-.07-.11-.18-.18-.3-.19-2.11-.16-4.04-1.26-5.26-2.99-3.03-4.41-1.17-12.11-1.15-12.18,.01-.04,.01-.09,.01-.13,.09-1.84,.45-3.66,1.09-5.4,.36-1.17,.68-2.03,.68-2.04,.02-.04,.02-.09,.02-.13,0-.23,.02-.54,.04-.9,.16-3.07,.73-9.35,.8-9.69,.08-.3-.06-8.67-.19-15.68-.32-3,.96-11.42,.95-11.42,.22-.6,.05-4.86-.01-6.19-.2-1.51-.25-3.04-.18-4.57,0-.04,0-.08-.01-.12-1.08-4.32,.96-5.03,1.12-5.09,.53-.3,1.13-.47,1.75-.49,1.01,.06,1.9,.71,2.24,1.67">
                            </path>
                            <path id="lt" class="n" d="M379.76,1233.41c.26-.3,6.24-7.36,4.32-14.61,0-.04-.1-.33-.24-.84-.24-.81-.63-2.15-1.09-3.79-.32-1.11-.67-2.35-1.03-3.65-.01-.05-.04-.09-.06-.13-2.78-3.82-5.94-5.75-9.4-5.75-4.56,0-8.63,3.34-11.25,6.13-.07,.07-.11,.17-.11,.26-.02,.34-.03,.63-.03,.86-.08,.23-.35,1-.66,2.01-.56,1.81-1.2,4.25-1.13,5.64-.2,.83-1.84,8.24,1.28,12.79,1.31,1.88,3.38,3.09,5.66,3.32,.47,.66,2.37,3.03,5.47,3.03,2.68,0,5.47-1.78,8.29-5.29m-7.51-27.93c3.16,0,6.08,1.8,8.68,5.35,.36,1.28,.7,2.49,1.02,3.58,.47,1.64,.86,2.98,1.09,3.79,.14,.48,.22,.76,.23,.81,1.8,6.82-4.08,13.78-4.15,13.86-2.66,3.31-5.23,4.99-7.65,4.99-3.06,0-4.86-2.78-4.87-2.81-.07-.11-.18-.18-.3-.19-2.11-.16-4.04-1.26-5.26-2.99-3.03-4.41-1.17-12.11-1.15-12.18,.01-.04,.01-.09,.01-.13,.09-1.84,.45-3.66,1.08-5.4,.36-1.17,.68-2.03,.68-2.04,.02-.04,.02-.09,.02-.13,0-.2,.01-.45,.03-.75,2.5-2.65,6.33-5.76,10.53-5.76">
                            </path>
                        </g>
                        <g id="IPR_UR3" ${IPRArray.UR3.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="jc" class="mw" d="M442.42,1213.15s4.92-13.21,5.14-14.69c0,0,2.02-10.7,4.06-15.49,0,0,2.42-10.26,2.68-14.55,0,0,.33-10.5,1.3-15.19,0,0,.35-12.29,1.98-13.66,0,0,2.09-3.26,4.34,5.75,2.25,9.01,5.2,17.96,4.36,22.36,0,0,1.28,18.46,.5,21.17,0,0,.52,16.23,2.81,22.42,0,0,5.02,15.54-.92,19.94,0,0-3.65,3.11-7.2,5.63-5.04,3.57-9.71-.11-14.57-4.16-4.86-4.04-11.18-2.09-4.47-19.53">
                            </path>
                            <path id="jd" class="mk" d="M468.66,1231.21s-3.65,3.11-7.2,5.63c-5.04,3.57-9.71-.11-14.57-4.16-4.86-4.04-11.18-2.09-4.47-19.53,0,0,.89-2.4,1.94-5.28,.7-1.92,1.46-4.05,2.07-5.81,5.91-5.21,15.49-10.27,21.94,4.27,.25,1.54,.6,3.05,1.07,4.54,.05,.14,.09,.27,.14,.4,0,0,5.02,15.54-.92,19.94">
                            </path>
                            <path id="je" class="mx" d="M466.2,1163.29c-.66-3.99-1.56-7.93-2.71-11.81-.6-2.24-1.16-4.48-1.75-6.72-.34-1.53-.9-3-1.65-4.38-.42-.7-1.22-1.6-2.04-1.14,.1,.13,.18,.25,.25,.38,.75,1.37,1.3,2.85,1.65,4.37,.6,2.24,1.16,4.48,1.75,6.72,1.15,3.88,2.06,7.82,2.71,11.81,.24,1.4,.27,2.82,.11,4.23-.04,.33-.04,.66,0,.99,.28,4.27,.52,8.55,.64,12.82,.06,2.07,.13,4.17,0,6.24-.02,.32-.05,.63-.09,.95-.04,.16-.07,.32-.09,.49,.02,.64,.05,1.28,.08,1.92,.15,3.12,.37,6.24,.69,9.34,.09,.86,.19,1.72,.29,2.58,.88,1.31,1.65,2.69,2.28,4.13-.03-.17-.06-.33-.08-.5-.29-1.81-.52-3.63-.7-5.45-.32-3.11-.54-6.22-.69-9.34-.03-.64-.06-1.28-.08-1.92,.02-.16,.05-.33,.09-.49,.05-.31,.08-.63,.09-.95,.14-2.07,.07-4.17,0-6.24-.12-4.28-.36-8.55-.64-12.82-.02-.25-.03-.51-.02-.76v-.06s.01-.1,.02-.15c0,0,0-.01,0-.02,.16-1.41,.13-2.83-.11-4.23">
                            </path>
                            <path id="jf" class="nc" d="M471.53,1222.12c-.12-2.43-.46-4.84-1.02-7.2-.27-1.19-.57-2.39-.94-3.55-.58-1.68-1-3.41-1.25-5.17-.63-1.44-1.4-2.83-2.28-4.13,.12,.96,.25,1.92,.41,2.87,.26,1.93,.7,3.82,1.33,5.66,.37,1.17,.67,2.36,.94,3.55,.56,2.37,.9,4.78,1.02,7.2,.09,2.37-.04,4.95-1.15,7.1-.45,.84-1.07,1.58-1.82,2.17-1.33,1.13-2.69,2.22-4.07,3.29-.89,.69-1.79,1.36-2.7,2.02-.85,.65-1.81,1.14-2.83,1.45-1.21,.31-2.48,.29-3.69-.05,1.22,.62,2.56,.95,3.93,.95,1.47-.05,2.89-.56,4.06-1.44,1.84-1.31,3.71-2.77,5.08-3.88,1.27-1.03,2.11-1.75,2.11-1.75,1.83-1.36,2.62-3.78,2.83-6.48,.06-.87,.06-1.74,.02-2.61">
                            </path>
                            <path id="jg" class="nc" d="M449.48,1204.22c-.71,2.62-1.91,6.03-2.89,9.81-.51,1.92-.87,3.88-1.09,5.85-.1,.94-.14,1.89-.13,2.83,0,.82,.08,1.64,.2,2.45,.09,.63,.23,1.25,.41,1.86,.12,.43,.27,.86,.44,1.27,.28,.64,.45,.98,.45,.98v.02c.58,1.1,1.73,.84,2.58-.59s1.08-3.49,.5-4.59c-.06-.13-.15-.24-.24-.35,0,0-.14-.15-.38-.44-.14-.19-.27-.38-.38-.58-.17-.28-.3-.58-.41-.89-.15-.42-.26-.85-.33-1.29-.1-.58-.15-1.17-.16-1.75-.01-1.56,.1-3.11,.34-4.65,.48-3.42,1.33-7.09,1.76-9.86,.22-1.39-.33-1.39-.69-.09">
                            </path>
                            <path id="jh" class="n" d="M461.71,1237.31c3.52-2.5,7.19-5.62,7.2-5.64,6.1-4.53,1.28-19.76,1.06-20.42-2.17-5.86-2.74-21.12-2.78-22.23,.74-2.91-.41-19.9-.5-21.2,.65-3.54-.97-9.62-2.85-16.64-.51-1.91-1.03-3.88-1.52-5.84-1.12-4.47-2.35-6.64-3.78-6.64-.51,.03-.98,.29-1.28,.71-1.65,1.57-2.02,11.87-2.07,13.86-.97,4.66-1.3,14.83-1.31,15.25-.26,4.21-2.65,14.38-2.65,14.42-2.03,4.78-4,15.14-4.08,15.59-.17,1.17-3.75,10.94-5.11,14.6-5.47,14.23-2.33,15.94,1.63,18.11,1.05,.53,2.04,1.17,2.97,1.89,3.21,2.67,6.86,5.7,10.61,5.7,1.61-.02,3.18-.55,4.47-1.52m-.2-91.76c.49,1.97,1.02,3.94,1.53,5.85,1.78,6.67,3.46,12.98,2.82,16.33,0,.03,0,.07,0,.11,.44,6.36,1.12,18.94,.52,21.03-.01,.04-.02,.09-.02,.13,.02,.67,.55,16.37,2.83,22.53,.05,.15,4.86,15.31-.79,19.5-.04,.03-3.67,3.13-7.17,5.6-1.15,.87-2.54,1.35-3.98,1.37-3.46,0-6.98-2.93-10.08-5.51-.96-.76-2-1.43-3.1-1.98-3.75-2.05-6.46-3.53-1.25-17.08,.2-.54,4.94-13.27,5.16-14.76,.02-.11,2.04-10.71,4.05-15.47,.1-.42,2.43-10.34,2.69-14.64,0-.1,.34-10.52,1.31-15.19,.13-4.68,.75-12.44,1.83-13.35,.03-.03,.06-.06,.08-.09,.14-.21,.36-.35,.61-.38,.35,0,1.58,.43,2.97,6.01">
                            </path>
                            <path id="ji" class="n" d="M461.7,1237.31c3.52-2.5,7.19-5.62,7.2-5.63,6.1-4.53,1.28-19.76,1.06-20.43-.04-.1-.08-.21-.14-.38-.46-1.46-.81-2.96-1.05-4.48,0-.03-.02-.07-.03-.1-2.88-6.5-6.69-9.8-11.32-9.8-3.44,0-7.23,1.81-11.28,5.38-.05,.05-.1,.11-.12,.18-.61,1.76-1.37,3.89-2.07,5.8-1.04,2.87-1.94,5.27-1.94,5.27-5.47,14.23-2.34,15.94,1.63,18.11,1.05,.53,2.04,1.17,2.97,1.89,3.21,2.67,6.85,5.7,10.61,5.7,1.61-.02,3.18-.55,4.47-1.52m-4.28-39.98c4.26,0,7.8,3.11,10.54,9.25,.25,1.56,.62,3.11,1.1,4.62,.04,.12,.08,.23,.11,.32,.05,.15,4.86,15.31-.79,19.5-.04,.03-3.68,3.13-7.17,5.6-1.15,.87-2.54,1.35-3.98,1.37-3.46,0-6.97-2.93-10.08-5.51-.96-.76-2-1.43-3.1-1.98-3.75-2.05-6.46-3.53-1.25-17.08,0,0,.89-2.4,1.94-5.28,.69-1.89,1.43-3.97,2.03-5.71,3.86-3.38,7.44-5.1,10.64-5.1">
                            </path>
                        </g>
                        <g id="IPR_UR2" ${IPRArray.UR2.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="lu" class="mw" d="M488.02,1212.69s4.79-12.76,5.12-19.14c0,0-.33-15.37,1.77-22.11,0,0,2.31-8.97,2.64-11.82,0,0,.7-13.97,5.43-3.32,.47,2.39,.62,4.84,.46,7.27,0,0,.8,9.34,.83,11.85,0,0,2.31,18.22,2.78,27.02,0,0,2.43,15.24,2.79,19.91l-.05,.31s1.52,8.8,.9,11.38c0,0,.83,4.81-7.31,4.01,0,0-3.73,1.14-8.41-1.65,0,0-4.47-.91-7.12-3.24,0,0-8.07-3.38,.17-20.46">
                            </path>
                            <path id="lv" class="mk" d="M503.39,1238.05s-3.73,1.14-8.41-1.65c0,0-4.48-.91-7.12-3.24,0,0-7.74-3.25-.31-19.44,.15-.34,.31-.68,.48-1.03,0,0,.85-2.25,1.85-5.34,3.99-5.25,10.55-10.21,17.8-.87l.4,2.65c.71,4.71,1.55,10.62,1.75,13.22l-.05,.32s1.53,8.8,.9,11.37c0,0,.83,4.82-7.31,4.01">
                            </path>
                            <path id="lw" class="mx" d="M500.55,1154.17c.25,.41,.46,.85,.63,1.3,.15,.57,.25,1.15,.3,1.73,.16,1.14,.26,2.29,.28,3.44,.01,.55,0,1.1-.04,1.64-.03,.6-.01,1.19,.05,1.79,.1,1.18,.19,2.36,.28,3.54,.18,2.35,.29,4.7,.48,7.05s.54,4.68,.81,7.01c.51,4.33,.98,8.66,1.39,13,.2,2.15,.36,4.3,.52,6.45,.04,.51,.09,1.02,.16,1.54,.04,.28,.08,.56,.12,.84,.03,.23,.02,.61,.19,.78,.7,.68,1.36,1.41,1.95,2.19-.2-1.15-.39-2.31-.53-3.47-.1-.91-.15-1.82-.22-2.74-.16-2.25-.37-4.51-.59-6.76-.44-4.5-.95-8.99-1.49-13.47-.2-1.69-.51-3.39-.57-5.09-.08-2.14-.25-4.28-.42-6.41-.08-1.09-.17-2.17-.26-3.26-.04-.51-.08-1.02-.13-1.53,0-.47,.02-.94,.08-1.41,.02-1-.02-2-.12-3-.06-1.02-.21-2.04-.44-3.04-.41-.99-.92-1.93-1.53-2.81-.41-.56-1.19-1.51-1.98-1.02,.41,.54,.77,1.11,1.07,1.72,.24,.47-.29-.55,0,0">
                            </path>
                            <path id="lx" class="nc" d="M510.84,1232.21c-.05-2.13-.24-4.26-.56-6.36-.11-.83-.24-1.66-.38-2.49-.08-.32-.1-.66-.07-.99,.01-.47-.03-.95-.13-1.41-.06-.55-.13-1.11-.19-1.66-.13-1.07-.27-2.14-.42-3.21-.3-2.18-.62-4.36-.94-6.54-.16-1.03-.32-2.07-.49-3.1-.62-.81-1.3-1.57-2.04-2.27,.69,4.28,1.37,8.56,1.92,12.86,.14,1.07,.27,2.13,.39,3.2,.1,.48,.14,.96,.12,1.45-.02,.52,.04,1.03,.18,1.53,.31,1.92,.53,3.84,.72,5.78-.03-.31-.06-.62-.09-.93,.1,1.05,.19,2.1,.2,3.16,.04,.53,.01,1.06-.08,1.58-.1,.44-.01,.88-.08,1.33-.26,1.37-1.28,2.46-2.63,2.82-1.38,.4-2.83,.53-4.26,.37-.5,0-.99,.05-1.48,.15-.54,.05-1.08,.06-1.62,.02-1.07-.07-2.12-.29-3.13-.65,1.61,.85,3.39,1.34,5.21,1.43,.79,.05,1.59-.02,2.37-.21,.12-.01,.24,0,.36,.02,.24,.02,.49,.04,.73,.05,.43,.02,.85,.02,1.28,0,1.53-.08,3.32-.43,4.32-1.72,.43-.56,.67-1.25,.68-1.96-.01-.31,0-.63,.06-.94,.06-.43,.09-.86,.07-1.3h0">
                            </path>
                            <path id="ly" class="nc" d="M491.03,1229.8c-.11-1.13-.46-2.12-.67-3.2-.26-1.39-.31-2.82-.14-4.22,.34-2.52,.92-5,1.75-7.41,.48-1.5,1.03-3,1.62-4.48l.68-1.73c.21-.53,.92-.77,1-.24-.04,.42-.15,.82-.33,1.2-.24,.74-.5,1.48-.71,2.22-.44,1.5-.88,3.01-1.22,4.51-.68,3.05-1.15,6.18-.41,8.78,.21,.73,.51,1.4,.72,2.13,.2,.51,.3,1.06,.29,1.61-.19,1.58-2.44,2.31-2.59,.84">
                            </path>
                            <path id="m" class="n" d="M503.42,1238.47c3.33,.31,5.64-.26,6.85-1.69,.63-.76,.94-1.74,.84-2.73,.57-2.62-.75-10.53-.9-11.4l.04-.25s0-.06,0-.09c-.36-4.63-2.77-19.79-2.79-19.9-.47-8.72-2.76-26.87-2.78-27.01-.03-2.44-.76-11.06-.83-11.84,.17-2.46,.01-4.94-.47-7.36,0-.03-.01-.06-.03-.09-1.29-2.9-2.38-4.25-3.45-4.25-2.28,0-2.72,6.43-2.78,7.69-.33,2.79-2.61,11.67-2.63,11.75-2.08,6.73-1.79,21.62-1.78,22.22-.32,6.24-5.05,18.88-5.08,18.98-4.46,9.24-4.13,14.52-3.07,17.32,.52,1.57,1.6,2.88,3.04,3.68,2.55,2.22,6.59,3.15,7.2,3.28,1.97,1.21,4.23,1.87,6.55,1.91,.69,.01,1.38-.07,2.05-.23m-.84-82.05c.46,2.33,.61,4.72,.45,7.09,0,.03,0,.06,0,.09,0,.09,.8,9.35,.83,11.87,.02,.18,2.32,18.3,2.79,27.04,.02,.15,2.41,15.18,2.78,19.82l-.04,.27s0,.09,0,.13c.01,.09,1.5,8.74,.9,11.21-.01,.06-.01,.11,0,.17,.08,.77-.15,1.54-.65,2.14-1.02,1.21-3.14,1.69-6.21,1.39-.05,0-.11,0-.16,.02-.62,.15-1.25,.23-1.89,.21-2.19-.04-4.33-.67-6.18-1.83-.04-.02-.08-.04-.13-.05-.04,0-4.4-.91-6.93-3.14-.03-.03-.07-.06-.11-.08-1.27-.71-2.23-1.88-2.67-3.28-.99-2.65-1.26-7.68,3.07-16.65,.2-.52,4.82-12.9,5.15-19.29,0-.15-.3-15.39,1.75-22,.09-.37,2.32-9.03,2.66-11.9,.17-3.33,.96-6.93,1.94-6.93,.3,0,1.17,.36,2.66,3.71">
                            </path>
                            <path id="ma" class="n" d="M503.42,1238.47c3.33,.32,5.64-.26,6.85-1.69,.63-.76,.94-1.74,.84-2.73,.57-2.62-.75-10.53-.9-11.4l.04-.25s0-.06,0-.09c-.2-2.63-1.07-8.66-1.76-13.25l-.4-2.65c-.01-.07-.04-.14-.08-.19-5.82-7.5-12.39-7.11-18.47,.87-.03,.04-.05,.08-.06,.12-.99,3.04-1.83,5.29-1.83,5.29-.17,.35-.33,.69-.49,1.03-3.99,8.69-3.59,13.7-2.55,16.37,.52,1.53,1.6,2.82,3.01,3.61,2.55,2.22,6.59,3.15,7.2,3.28,1.97,1.21,4.23,1.87,6.55,1.9,.69,0,1.38-.07,2.05-.23m-4.15-36.82c2.72,0,5.41,1.68,8.01,4.99l.39,2.54c.68,4.55,1.54,10.51,1.75,13.15l-.04,.27s0,.09,0,.13c.02,.09,1.5,8.74,.91,11.2-.01,.06-.02,.11,0,.17,.09,.78-.15,1.55-.65,2.15-1.03,1.21-3.14,1.68-6.2,1.38-.05,0-.11,0-.16,.02-.62,.15-1.26,.23-1.89,.21-2.19-.04-4.32-.67-6.18-1.82-.04-.02-.09-.04-.13-.05-.04-.01-4.4-.91-6.93-3.14-.03-.03-.07-.06-.12-.08-1.24-.69-2.18-1.82-2.62-3.17-.98-2.52-1.34-7.28,2.53-15.71,.15-.33,.31-.68,.5-1.05,0-.02,.85-2.27,1.84-5.29,2.07-2.7,5.3-5.89,9.02-5.89">
                            </path>
                        </g>
                        <g id="IPR_UR4" ${IPRArray.UR4.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="lf" class="mw" d="M405.8,1234.22s-13.58-3.12-2.78-25.14c0,0,3.38-15.52,2.78-18.39,0,0,.47-10.55,.07-12.99,0,0-1.66-19.27-.08-21.61,0,0,2.12-3.49,2.77,2.95,0,0,1.29-13.82,4.92-8.93,0,0,4.3,8.69,5.49,25.65,0,0,1.81,10.21,1.92,12.51,0,0,.95,7.59,.88,9.63,0,0,1.68,9.41,2.77,11.53,2.13,4.21,3.31,8.83,3.47,13.54,0,0,1.17,6.86-3.1,8.72-1.27,.44-2.4,1.21-3.28,2.23,0,0-7.21,9.64-15.81,.31">
                            </path>
                            <path id="lg" class="mk" d="M424.89,1231.68c-1.27,.44-2.4,1.21-3.28,2.23,0,0-7.21,9.64-15.81,.31,0,0-12.43-2.86-4.05-22.38,.38-.89,.8-1.81,1.27-2.76,.7-1.43,.03-.12,.08-.34,4.4-4.36,12.32-10.32,21.77,1.37,.27,.56,.66,1.43,1.08,2.55,1.26,3.3,1.95,6.79,2.05,10.31,0,0,1.17,6.86-3.1,8.72">
                            </path>
                            <path id="lh" class="mx" d="M411.58,1149.16c.24,.38,.44,.78,.6,1.2,1.67,4.27,2.89,8.7,3.63,13.22,.34,1.88,.62,3.76,.85,5.65,.13,1.06,.24,2.12,.34,3.17,.08,.85,.06,1.75,.21,2.59,.3,1.71,.59,3.42,.88,5.14,.66,3.99,1.15,7.99,1.57,12.01,.13,1.26,.25,2.53,.32,3.8,0,.55,.04,1.1,.11,1.65,.41,2.2,.85,4.41,1.35,6.59,.24,1.03,.49,2.06,.8,3.06,.93,.88,1.8,1.82,2.6,2.82-.21-.44-.34-.68-.34-.68-1.09-2.12-2.77-11.53-2.77-11.53,.08-2.04-.87-9.63-.87-9.63-.11-2.3-1.92-12.51-1.92-12.51-1.18-16.96-5.49-25.65-5.49-25.65-.24-.36-.56-.66-.93-.89-.29-.16-.65-.17-.95-.02">
                            </path>
                            <path id="li" class="nc" d="M422.21,1207.19c.04,.12,.08,.25,.11,.37,.33,1,.87,1.91,1.28,2.88,1.61,3.69,2.5,7.67,2.6,11.7,.51,3.13,.03,7.49-3.33,8.8-1.26,.49-2.36,1.3-3.22,2.34-.62,.74-1.32,1.41-2.08,2-2.26,1.9-5.31,2.58-8.16,1.82,.17,.09,.34,.18,.52,.26,.11,.05,.22,.1,.33,.15,.05,.02,.11,.05,.16,.07,.68,.28,1.39,.47,2.11,.56,.03,0,.07,0,.1,.01,.08,0,.17,.02,.25,.03h.17c.13,.02,.26,.02,.39,.02h.08c.17,0,.35,0,.52-.02h.06c.17-.01,.33-.03,.5-.05l.13-.02c.1-.02,.2-.03,.3-.05,3.52-.68,5.98-3.54,6.45-4.12,.05-.07,.08-.11,.08-.11,.88-1.02,2.01-1.78,3.28-2.23,.26-.11,.51-.25,.74-.4,3.39-2.29,2.36-8.31,2.36-8.31,0-.08,0-.15,0-.23,0-.16,0-.32-.01-.49,0-.1-.01-.2-.02-.3,0-.14-.02-.28-.03-.42,0-.1-.02-.2-.02-.3-.01-.14-.02-.28-.04-.41,0-.1-.02-.2-.03-.3-.02-.14-.03-.27-.05-.41-.01-.1-.02-.19-.04-.29-.02-.13-.04-.27-.05-.4-.01-.09-.03-.19-.04-.28-.02-.14-.04-.27-.07-.4-.02-.09-.03-.18-.05-.27-.03-.14-.05-.27-.08-.41-.02-.08-.03-.16-.05-.24-.03-.14-.06-.28-.09-.42-.02-.07-.03-.14-.05-.21-.04-.17-.08-.33-.12-.5l-.03-.12c-.05-.2-.1-.4-.15-.59-.02-.09-.05-.18-.08-.27s-.05-.2-.08-.3-.06-.21-.09-.32c-.02-.08-.05-.15-.07-.23-.04-.12-.07-.23-.11-.34-.02-.06-.03-.11-.05-.17-.04-.12-.08-.25-.12-.37-.01-.04-.03-.08-.04-.12l-.13-.4s-.01-.03-.02-.05c-.39-1.12-.84-2.22-1.34-3.29-.8-1-1.67-1.94-2.6-2.82">
                            </path>
                            <path id="lj" class="nc" d="M407.1,1207.48c-.25,1.22-.74,2.27-1.09,3.43-.44,1.49-.66,3.04-.66,4.6,.05,2.78,.37,5.56,.96,8.28,.32,1.68,.73,3.38,1.17,5.07,.17,.65,.34,1.31,.51,1.96,.16,.6,.88,.94,1.03,.37,.01-.46-.06-.91-.2-1.35-.17-.83-.35-1.67-.48-2.5-.28-1.69-.57-3.38-.74-5.05-.35-3.4-.48-6.87,.62-9.64,.31-.78,.71-1.48,1.02-2.25,.28-.54,.45-1.13,.5-1.73,0-1.75-2.3-2.78-2.63-1.19">
                            </path>
                            <path id="lk" class="n" d="M421.94,1234.16c.84-.96,1.92-1.68,3.12-2.1,4.52-1.97,3.4-8.88,3.35-9.11-.15-4.78-1.34-9.46-3.51-13.72-1.02-1.96-2.6-10.68-2.72-11.37,.06-2.11-.84-9.34-.88-9.62-.11-2.3-1.85-12.14-1.92-12.52-1.17-16.85-5.49-25.71-5.56-25.87-.38-.67-1.05-1.13-1.82-1.22-1.99,0-3.03,4.5-3.52,7.66-.35-1.06-.83-1.57-1.47-1.57-.85,0-1.5,1.03-1.56,1.13-1.62,2.39-.16,19.89,.01,21.91,.4,2.38-.07,12.8-.08,12.91,0,.03,0,.07,0,.1,.45,2.19-1.61,12.81-2.77,18.17-4.29,8.76-5.3,15.63-3.01,20.43,1.16,2.5,3.33,4.4,5.97,5.22,2.55,2.73,5.23,4.11,7.99,4.11,4.92,0,8.24-4.36,8.37-4.54m-15.65-56.51c-.66-7.69-1.25-19.71-.13-21.35,.16-.26,.57-.74,.86-.74,.08,0,.79,.1,1.14,3.51,.02,.21,.2,.38,.42,.38h0c.21,0,.39-.16,.41-.38,.38-3.98,1.56-9.6,3.02-9.6,.32,0,.72,.3,1.11,.82,.04,.09,4.28,8.83,5.45,25.53,.02,.1,1.8,10.21,1.91,12.49,0,.08,.94,7.58,.87,9.57,0,.03,0,.06,0,.09,.07,.39,1.7,9.5,2.82,11.66,2.09,4.17,3.26,8.74,3.42,13.41,.01,.07,1.06,6.56-2.82,8.25-1.35,.47-2.56,1.29-3.49,2.37-.03,.04-3.21,4.21-7.71,4.21-2.54,0-5.05-1.32-7.46-3.93-.06-.06-.13-.11-.21-.12-2.44-.74-4.45-2.48-5.53-4.8-2.18-4.57-1.16-11.22,3.03-19.75,.01-.03,.03-.06,.03-.09,.14-.63,3.35-15.46,2.8-18.51,.04-.88,.46-10.63,.06-13">
                            </path>
                            <path id="ll" class="n" d="M421.94,1234.16c.84-.96,1.92-1.68,3.12-2.1,4.52-1.97,3.39-8.88,3.35-9.11-.1-3.58-.8-7.11-2.08-10.45-.43-1.15-.83-2.03-1.09-2.58-.01-.03-.03-.06-.05-.08-3.74-4.63-7.65-6.97-11.6-6.97-4.64,0-8.38,3.18-10.8,5.57-.06,.06-.09,.13-.11,.2l-.07,.3c-.47,.96-.89,1.88-1.26,2.74-3.26,7.61-3.82,13.65-1.64,17.94,1.19,2.39,3.3,4.19,5.85,4.98,2.55,2.73,5.23,4.11,7.99,4.11,4.92,0,8.24-4.36,8.37-4.54m-8.34-30.46c3.68,0,7.35,2.23,10.92,6.63,.25,.53,.63,1.38,1.04,2.47,1.24,3.28,1.93,6.74,2.03,10.24,.01,.07,1.07,6.55-2.82,8.25-1.35,.47-2.56,1.29-3.49,2.37-.03,.04-3.2,4.21-7.71,4.21-2.54,0-5.05-1.32-7.46-3.93-.06-.06-.13-.11-.21-.12-2.36-.72-4.33-2.38-5.43-4.59-2.05-4.06-1.49-9.85,1.67-17.22,.36-.86,.79-1.78,1.26-2.74,.01-.03,.03-.06,.03-.1l.05-.22c2.31-2.28,5.85-5.24,10.12-5.24">
                            </path>
                        </g>
                        
                        <g id="IPR_UR1" ${IPRArray.UR1.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="mb" class="mw" d="M551.21,1238.21s-16.91,0-26.77-5.23c0,0-.8,.24-1.03-4.36,0,0-1.61-16.76,3.69-27.13h0c-.6-8.65-.14-17.34,1.38-25.87,0,0,2.08-15.21,2.23-18.85,0,0,.83-18.02,9.1-5.28,0,0,6.12,10.84,8.32,19.16,0,0,7.8,21.67,5.09,36.84h0c.46,1.9,.81,3.83,1.04,5.78,2.14,17.38,1.65,14.43,1.99,19.67,0,0,.56,5.85-5.03,5.28">
                            </path>
                            <path id="mc" class="mk" d="M523.32,1228.62s-3.54-36.72,17.07-35.11c0,0,11.18-1.38,13.78,19.76,2.14,17.39,1.65,14.43,1.99,19.67,0,0,.56,5.85-5.03,5.28,0,0-16.91,0-26.77-5.23,0,0-.81,.24-1.03-4.36">
                            </path>
                            <path id="md" class="mx" d="M548.12,1170.64c-2.2-8.32-8.32-19.16-8.32-19.16-1.75-2.69-3.16-4.01-4.31-4.41-.22-.08-.45-.13-.68-.14,1.27,1.08,2.35,2.36,3.2,3.79,0,0,6.12,10.84,8.32,19.16,0,0,8.3,18.52,5.59,33.69,0,0,1.18,3.66,1.29,3.92,2.7-15.17-5.1-36.85-5.1-36.85">
                            </path>
                            <path id="me" class="nc" d="M556.32,1232.96c-.34-5.24,.15-2.28-1.99-19.67-.22-1.78-.78-4.34-1.11-5.81l-1.29-3.89c.09,1.3,.39,7.09,.62,8.94,2.14,17.39,1.65,14.43,1.99,19.67,0,0,.53,5.5-4.54,5.31-.19,0-.38-.01-.58-.04h-.15c-1.45-.01-13.84-.23-23.14-3.68-.19-.08-.39-.14-.58-.22,.16,.08,.32,.15,.47,.22,9.42,4.2,23.49,4.44,25.03,4.46h.15c.2,.02,.39,.03,.58,.03,5.06,.19,4.54-5.31,4.54-5.31">
                            </path>
                            <path id="mf" class="nc" d="M546.87,1227.69c.24-1.07,.4-2.15,.48-3.24,.12-2.29-.01-4.59-.39-6.85-.35-2.31-.83-4.61-1.38-6.88-.28-1.15-.58-2.29-.9-3.43-.15-.54-.31-1.09-.46-1.63-.1-.56-.27-1.1-.5-1.62-.12-.21-.41-.5-.68-.37-.34,.17-.21,.73-.15,1.01,.22,1,.49,1.99,.71,2.99,.5,2.28,.94,4.57,1.26,6.88,.35,2.23,.51,4.48,.49,6.73-.02,1.06-.13,2.11-.33,3.15-.22,1.09-.6,2.12-.9,3.19-.36,1.28-.84,2.88,.3,3.92,.29,.3,.7,.44,1.11,.39,.44-.15,.73-.56,.73-1.03,.13-1.08,.34-2.15,.62-3.2">
                            </path>
                            <path id="mg" class="n" d="M555.33,1237.31c1.53-1.69,1.3-4.31,1.29-4.41-.07-1.09-.1-1.82-.13-2.46-.11-2.45-.16-3.46-1.86-17.23-.23-1.93-.57-3.85-1.02-5.74,2.66-15.1-5.04-36.76-5.11-36.94-2.19-8.28-8.3-19.15-8.37-19.28-2.08-3.2-3.85-4.75-5.43-4.75-3.86,0-4.4,9.19-4.44,10.24-.15,3.58-2.21,18.66-2.23,18.79-1.52,8.53-1.99,17.22-1.39,25.86-5.23,10.37-3.69,27.09-3.68,27.23,.19,4.02,.83,4.69,1.33,4.76,9.85,5.17,26.7,5.21,26.84,5.23,.28,.03,.54,.04,.79,.04,1.28,.07,2.52-.43,3.41-1.35m-31.54-8.74c-.02-.17-1.54-16.75,3.65-26.9,.01-.03,.03-.06,.03-.09,.01-.05,.02-.1,0-.15-.61-8.62-.15-17.27,1.38-25.77,.08-.62,2.08-15.27,2.24-18.88,.12-2.63,1-9.44,3.61-9.44,.86,0,2.38,.76,4.71,4.35,.06,.11,6.12,10.89,8.29,19.1,.08,.22,7.71,21.71,5.07,36.59-.02,.07-.02,.14,0,.21,.46,1.89,.8,3.8,1.03,5.73,1.69,13.74,1.74,14.75,1.85,17.17,.03,.64,.06,1.38,.14,2.49,0,.02,.2,2.37-1.08,3.78-.73,.74-1.75,1.14-2.79,1.07-.23,0-.46-.01-.75-.04-.17,0-16.92-.07-26.58-5.18-.04-.02-.08-.04-.12-.04-.11-.13-.53-.84-.68-3.99">
                            </path>
                            <path id="mh" class="n" d="M555.23,1237.32c1.53-1.69,1.31-4.31,1.3-4.41-.07-1.08-.1-1.82-.13-2.45-.11-2.44-.16-3.45-1.86-17.24-2.36-19.18-11.89-20.15-13.77-20.15-.21,0-.36,0-.42,.02-.44-.03-.87-.05-1.29-.05-3.72-.08-7.28,1.48-9.75,4.26-8.46,9.32-6.53,30.47-6.45,31.35,.19,4.02,.83,4.69,1.34,4.76,9.74,5.11,26.34,5.23,26.83,5.23h0c.28,.03,.54,.04,.79,.04,1.28,.07,2.52-.43,3.41-1.35m-31.54-8.74c-.02-.22-1.98-21.68,6.23-30.72,2.31-2.6,5.65-4.06,9.13-3.98,.41,0,.83,.02,1.34,.05,.01,0,.14-.01,.37-.01,1.76,0,10.67,.94,12.94,19.41,1.69,13.76,1.74,14.76,1.85,17.18,.03,.64,.06,1.38,.13,2.48,0,.02,.21,2.37-1.08,3.78-.73,.75-1.75,1.14-2.79,1.08-.23,0-.46-.01-.75-.04-.17,0-16.92-.07-26.58-5.18-.04-.02-.08-.04-.12-.04-.11-.13-.53-.83-.68-3.99">
                            </path>
                        </g>
                        <g id="IPR_LR6" ${IPRArray.LR6.I==4?'opacity="0.3"':'opacity="1"'}>
                            <path id="im" class="my" d="M322.56,1267.71s-.07,0-.1-.01c.01,0,.02,.02,.03,.03h.05l.02-.02"></path>
                            <path id="in" class="my" d="M322.54,1267.73h-.05s.02,.01,.03,.02l.02-.02"></path>
                            <path id="io" class="my" d="M307.39,1268.26h-.04s.02,0,.03,0h0"></path>
                            <path id="ip" class="mk" d="M313.91,1263.5c-4.71,.13-9.3,3.09-9.3,3.09-.07-.07-.14-.14-.22-.2-.58,.6-1.12,1.23-1.63,1.89-1.78-3.18-9.46-2.99-9.46-2.99,.36-.3,.74-.59,1.14-.84-2.39,.43-4.72,1.15-6.93,2.14-10.42,4.41-3.34,20.3-3.34,20.3,.13,.46,.26,.94,.36,1.43,4.93,1.89,10.91,2.49,14.69,1.89,0,0,5.25-1.68,9.91,.03,0,0,2.73,1.13,10.51-1.9,.38-1.14,.94-2.21,1.65-3.17,2.15-4.15,2.81-8.91,1.87-13.49,0-.03-.01-.05-.02-.08-2.59-3.92-7.55-7.08-9.24-8.08">
                            </path>
                            <path id="iq" class="nb" d="M302.76,1268.28c.51-.66,1.05-1.3,1.63-1.89-2.68-2.42-6.57-2.51-9.95-1.94-.4,.26-.78,.54-1.14,.84,0,0,7.67-.19,9.46,2.99">
                            </path>
                            <path id="ir" class="nb" d="M313.91,1263.5c1.69,1.01,6.65,4.16,9.24,8.08-1.62-6.48-5.47-8.19-9.24-8.08">
                            </path>
                            <path id="is" class="mw" d="M319.65,1288.32c-7.77,3.03-10.5,1.9-10.5,1.9-4.66-1.71-9.91-.03-9.91-.03-3.79,.61-9.77,0-14.7-1.89,3.29,14.6-3.84,40.11-3.84,40.11-.8,4.54,3.47,2.54,3.47,2.54,10.95-4.14,14.16-21.1,14.16-21.1,3.47-6.94,6.14-.53,6.14-.53,1.2,4.67-6.14,25.64-6.14,25.64-2,7.34,5.87,1.34,5.87,1.34,14.83-12.95,13.76-35.26,13.76-35.26-.21-6.1,.74-10.21,1.69-12.72">
                            </path>
                            <path id="it" class="nc" d="M302,1269.74c-1.12,1.4-1.29,3.47-1.21,5.18,.13,1.94,.61,3.85,1.43,5.62,.38,.61,.63,1.29,.75,2,.01,.71-.5,1.58-1.32,1.44-.76-.13-.94-.95-1.13-1.57-.3-.92-.55-1.85-.75-2.79-.52-2.16-.57-4.41-.15-6.59,.22-1.1,.64-2.16,1.23-3.12,.19-.32,.42-.6,.69-.85,.41-.33,.74,.36,.46,.68">
                            </path>
                            <path id="iu" class="nc" d="M306.99,1286.95c1.97,.35,3.97,.52,5.98,.51,.81-.01,1.62-.14,2.4-.38,.42-.14,.83-.31,1.22-.52,.25-.14,.45-.32,.72-.45,.3-.2,.64,.07,.43,.25-.28,.26-.59,.5-.92,.7-.73,.43-1.52,.74-2.35,.91-2.29,.38-4.62,.45-6.92,.22-.63-.04-1.44-.03-1.78-.39-.41-.45,.35-.98,1.22-.85">
                            </path>
                            <path id="iv" class="my" d="M319.67,1288.29h0c-.78,.3-1.5,.56-2.19,.79-.99,3.65-1.39,7.44-1.19,11.22,0,0,1.07,22.3-13.75,35.26,0,0-2.55,1.94-4.38,2.27,.91,2.39,6.06-1.54,6.06-1.54,14.82-12.95,13.76-35.26,13.76-35.26-.21-6.12,.75-10.22,1.69-12.73">
                            </path>
                            <path id="iw" class="nc" d="M321.32,1285.1c1.57-3.01,2.35-6.36,2.29-9.75,0-1.25-.14-2.5-.41-3.72,0-.03-.02-.07-.03-.1-.69-1.02-1.48-1.97-2.36-2.83,.28,.72,.51,1.46,.7,2.21,.94,4.58,.28,9.34-1.87,13.49-1.01,1.41-1.74,2.99-2.15,4.67,.68-.23,1.41-.49,2.19-.79,.38-1.14,.94-2.21,1.65-3.18">
                            </path>
                            <path id="ix" class="my" d="M302.17,1292.87c-1.25,2.02-.6,4.29-.67,6.57-.07,1.53,1.97,4.8,.42,5.96-1.11,.84-1.85-5.26-1.74-6.09,.38-2.56-.03-4.84,1.71-7.03,.57-.06,.56,.11,.28,.59">
                            </path>
                            <path id="iy" class="n" d="M320.21,1288.4c.11-.04,.2-.13,.24-.24,.37-1.09,.9-2.12,1.58-3.05,.02-.02,.04-.05,.05-.08,2.22-4.26,2.89-9.16,1.89-13.86-.01-.05-.03-.09-.06-.13-2.6-3.93-7.42-7.05-9.38-8.21-.07-.04-.15-.06-.23-.06-4.16,.12-8.16,2.33-9.24,2.98-.17-.14-.42-.13-.57,.03-.57,.59-1.02,1.12-1.31,1.48-1.73-2.13-5.98-2.59-8.25-2.68l.14-.09c.19-.12,.25-.38,.13-.58-.09-.14-.26-.22-.42-.19-2.42,.43-4.78,1.16-7.02,2.17-2.34,.93-4.19,2.79-5.1,5.14-2.54,6.43,1.37,15.33,1.52,15.65,.13,.46,.25,.92,.36,1.4,.03,.14,.13,.25,.26,.3,4.58,1.76,10.69,2.6,14.97,1.89,1.65-.47,3.37-.71,5.09-.72,1.54-.02,3.08,.23,4.53,.74,.59,.19,1.21,.27,1.83,.24h0c1.6,0,4.46-.37,8.99-2.14m-20.63,1.07c-1.03,.16-2.08,.23-3.13,.23-3.8-.03-7.57-.71-11.14-2.01-.1-.42-.21-.84-.34-1.29-.04-.09-3.93-8.96-1.52-15.06,.83-2.14,2.52-3.84,4.66-4.69,1.67-.75,3.42-1.35,5.2-1.77-.05,.23,.09,.45,.31,.5,.03,0,.07,.01,.11,.01h.24c3.36,0,7.69,.73,8.84,2.78,.07,.12,.2,.2,.34,.21,.14,.02,.28-.05,.36-.17,0,0,.52-.7,1.33-1.57,.13,.07,.29,.06,.41-.02,.04-.03,4.47-2.84,8.96-3.01,1.61,.96,6.49,4.09,8.97,7.84,.9,4.46,.26,9.1-1.82,13.15-.69,.94-1.23,1.98-1.63,3.08-7.31,2.82-10,1.85-10.04,1.83-1.55-.55-3.19-.81-4.84-.79-1.79,0-3.56,.25-5.28,.74">
                            </path>
                            <path id="j" class="n" d="M303.5,1268.22c.5-.65,1.03-1.27,1.6-1.85,.16-.17,.16-.43,0-.59h-.01c-2.33-2.11-5.86-2.81-10.29-2.05-.06,0-.11,.03-.16,.06-.41,.27-.81,.56-1.18,.87-.18,.15-.2,.41-.05,.59,.08,.1,.2,.15,.33,.15h.24c3.36,0,7.69,.73,8.84,2.78,.07,.12,.2,.2,.34,.21,0,0,.02,0,.03,0,.13,0,.26-.06,.34-.17m-8.5-3.68c3.92-.66,7.07-.12,9.19,1.57-.42,.46-.77,.86-1,1.15-1.73-2.13-5.98-2.59-8.25-2.68,.02-.01,.04-.03,.06-.04">
                            </path>
                            <path id="ja" class="n" d="M323.73,1271.66c.19-.08,.29-.29,.24-.48-1.73-6.95-6.03-8.4-9.32-8.4-.11,0-.23,0-.34,0-.23,0-.41,.2-.41,.43,0,.14,.08,.28,.21,.35,1.49,.88,6.54,4.07,9.11,7.95,.08,.12,.21,.19,.35,.19,.06,0,.12-.01,.17-.04m-1.3-2.53c-1.93-2.09-4.13-3.92-6.53-5.45,3.02,.38,5.21,2.21,6.53,5.45">
                            </path>
                            <path id="jb" class="n" d="M304.89,1336.3c14.8-12.94,13.91-35.37,13.9-35.59-.21-6.16,.78-10.23,1.66-12.56,.08-.22-.03-.46-.25-.54-.1-.04-.2-.03-.3,0-7.44,2.9-10.17,1.92-10.21,1.9-1.55-.55-3.19-.81-4.84-.79-1.79,0-3.56,.25-5.28,.74-1.03,.16-2.08,.23-3.13,.23-3.88-.03-7.72-.74-11.35-2.08-.14-.06-.31-.03-.42,.08-.12,.1-.17,.26-.14,.41,3.23,14.33-3.76,39.65-3.84,39.94-.23,1.27-.09,2.21,.4,2.8,.41,.46,1.01,.71,1.63,.67,.69-.03,1.37-.18,2-.47,10.83-4.1,14.16-20.08,14.41-21.35,.98-1.93,1.97-2.95,2.88-2.95,1.19,0,2.19,1.76,2.46,2.38,1.16,4.5-6.06,25.19-6.14,25.42-.47,1.73-.45,2.9,.06,3.57,.33,.41,.83,.64,1.36,.61,1.94,0,4.98-2.3,5.13-2.42m-6.53-26.94s-.03,.07-.04,.11c-.03,.17-3.29,16.78-13.92,20.8-.53,.24-1.1,.37-1.68,.4-.37,.03-.73-.1-.99-.37-.36-.63-.44-1.38-.23-2.08,.07-.25,6.88-24.92,4-39.56,4.49,1.58,10.19,2.3,14.26,1.63,1.65-.47,3.37-.71,5.09-.72,1.54-.02,3.08,.23,4.53,.74,.13,.05,2.63,1.12,9.97-1.58-1.17,3.9-1.65,7.97-1.41,12.03,0,.22,.89,22.25-13.59,34.9-.81,.62-3.23,2.23-4.6,2.23-.26,.03-.52-.08-.7-.28-.19-.25-.43-.95,.08-2.82,.3-.86,7.37-21.14,6.14-25.94-.05-.12-1.25-2.95-3.25-2.95-1.28,0-2.51,1.17-3.66,3.46">
                            </path>
                        </g>
                        
                        <path class="nd" d="M204.83,1152.52v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M224.66,1341.41v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M273.96,1341.41v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M334.05,1341.41v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M378.67,1341.41v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M417.1,1341.41v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M461.83,1341.41v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M498.96,1341.41v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M536.33,1341.41v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M575.44,1341.41v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M613.24,1341.41v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M654.49,1341.41v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M692.77,1341.41v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M735.86,1341.41v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M795.74,1341.41v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M842.87,1341.41v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M274.44,1152.52v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M344.04,1152.52v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M392.07,1152.52v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M439.49,1152.52v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M485.21,1152.52v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M521.47,1152.52v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M564.78,1152.52v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M609.23,1152.52v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M644.69,1152.52v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M689.54,1152.52v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M783.87,1152.52v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M850.17,1152.52v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M909.7,1152.52v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <path class="nd" d="M738.97,1152.52v1.45h-3.74v3.74h-1.58v-3.74h-3.76v-1.45h3.76v-3.74h1.58v3.74h3.74Z"></path>
                        <rect class="na" x="166"  ${IPRArray.UR8.I==2?'opacity="1"':'opacity="0"'} y="1217.88" width="14.94" height="10.2" id="IPR_UR8"></rect>
                        <path id="IPRX_UR8" class="na" ${IPRArray.UR8.I==1?'opacity="1"':'opacity="0"'} d="M180,1217l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(195 1180)">
                            <tspan x="0" y="0" ${IPRArray.UR8.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.UR8.T}</tspan>
                        </text>
                        <rect class="na" x="235" ${IPRArray.UR7.I==2?'opacity="1"':'opacity="0"'} y="1217.88" width="14.94" height="10.2" id="IPR_UR7"></rect>
                        <path id="IPRX_UR7" class="na" ${IPRArray.UR7.I==1?'opacity="1"':'opacity="0"'} d="M245,1217l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(265 1180)">
                            <tspan x="0" y="0" ${IPRArray.UR7.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.UR7.T}</tspan>
                        </text>
                        <rect class="na" x="305" ${IPRArray.UR6.I==2?'opacity="1"':'opacity="0"'} y="1217.88" width="14.94" height="10.2" id="IPR_UR6"></rect>
                        <path id="IPRX_UR6" class="na" ${IPRArray.UR6.I==1?'opacity="1"':'opacity="0"'} d="M320,1217l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(330 1180)">
                            <tspan x="0" y="0" ${IPRArray.UR6.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.UR6.T}</tspan>
                        </text>
                        <rect class="na" x="365" ${IPRArray.UR5.I==2?'opacity="1"':'opacity="0"'} y="1217.88" width="14.94" height="10.2" id="IPR_UR5"></rect>
                        <path id="IPRX_UR5" class="na" ${IPRArray.UR5.I==1?'opacity="1"':'opacity="0"'} d="M375,1217l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(385 1180)">
                            <tspan x="0" y="0" ${IPRArray.UR5.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.UR5.T}</tspan>
                        </text>
                        <rect class="na" x="405" ${IPRArray.UR4.I==2?'opacity="1"':'opacity="0"'} y="1217.88" width="14.94" height="10.2" id="IPR_UR4"></rect>
                        <path id="IPRX_UR4" class="na" ${IPRArray.UR4.I==1?'opacity="1"':'opacity="0"'} d="M415,1217l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(430 1180)">
                            <tspan x="0" y="0" ${IPRArray.UR4.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.UR4.T}</tspan>
                        </text>
                        <rect class="na" x="450" ${IPRArray.UR3.I==2?'opacity="1"':'opacity="0"'} y="1217.88" width="14.94" height="10.2" id="IPR_UR3"></rect>
                        <path id="IPRX_UR3" class="na" ${IPRArray.UR3.I==1?'opacity="1"':'opacity="0"'} d="M460,1217l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(470 1180)">
                            <tspan x="0" y="0" ${IPRArray.UR3.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.UR3.T}</tspan>
                        </text>
                        <rect class="na" x="490" ${IPRArray.UR2.I==2?'opacity="1"':'opacity="0"'} y="1217.88" width="14.94" height="10.2" id="IPR_UR2"></rect>
                        <path id="IPRX_UR2" class="na" ${IPRArray.UR2.I==1?'opacity="1"':'opacity="0"'} d="M500,1217l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(510 1180)">
                            <tspan x="0" y="0" ${IPRArray.UR2.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.UR2.T}</tspan>
                        </text>
                        <rect class="na" x="530" ${IPRArray.UR1.I==2?'opacity="1"':'opacity="0"'} y="1217.88" width="14.94" height="10.2" id="IPR_UR1"></rect>
                        <path id="IPRX_UR1" class="na" ${IPRArray.UR1.I==1?'opacity="1"':'opacity="0"'} d="M540,1217l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(553 1180)">
                            <tspan x="0" y="0" ${IPRArray.UR1.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.UR1.T}</tspan>
                        </text>
                        <rect class="na" x="575" ${IPRArray.UL1.I==2?'opacity="1"':'opacity="0"'} y="1217.88" width="14.94" height="10.2" id="IPR_UL1"></rect>
                        <path id="IPRX_UL1" class="na" ${IPRArray.UL1.I==1?'opacity="1"':'opacity="0"'} d="M585,1217l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(595 1180)">
                            <tspan x="0" y="0" ${IPRArray.UL1.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.UL1.T}</tspan>
                        </text>
                        <rect class="na" x="615" ${IPRArray.UL2.I==2?'opacity="1"':'opacity="0"'} y="1217.88" width="14.94" height="10.2" id="IPR_UL2"></rect>
                        <path id="IPRX_UL2" class="na" ${IPRArray.UL2.I==1?'opacity="1"':'opacity="0"'} d="M625,1217l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(630 1180)">
                            <tspan x="0" y="0" ${IPRArray.UL2.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.UL2.T}</tspan>
                        </text>
                        <rect class="na" x="660" ${IPRArray.UL3.I==2?'opacity="1"':'opacity="0"'} y="1217.88" width="14.94" height="10.2" id="IPR_UL3"></rect>
                        <path id="IPRX_UL3" class="na" ${IPRArray.UL3.I==1?'opacity="1"':'opacity="0"'} d="M710,1217l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(675 1180)">
                            <tspan x="0" y="0" ${IPRArray.UL3.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.UL3.T}</tspan>
                        </text>
                        <rect class="na" x="700" ${IPRArray.UL4.I==2?'opacity="1"':'opacity="0"'} y="1217.88" width="14.94" height="10.2" id="IPR_UL4"></rect>
                        <path id="IPRX_UL4" class="na" ${IPRArray.UL4.I==1?'opacity="1"':'opacity="0"'} d="M710,1217l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(725 1180)">
                            <tspan x="0" y="0" ${IPRArray.UL4.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.UL4.T}</tspan>
                        </text>
                        <rect class="na" x="745" ${IPRArray.UL5.I==2?'opacity="1"':'opacity="0"'} y="1217.88" width="14.94" height="10.2" id="IPR_UL5"></rect>
                        <path id="IPRX_UL5" class="na" ${IPRArray.UL5.I==1?'opacity="1"':'opacity="0"'} d="M755,1217l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(770 1180)">
                            <tspan x="0" y="0" ${IPRArray.UL5.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.UL5.T}</tspan>
                        </text>
                        <rect class="na" x="800" ${IPRArray.UL6.I==2?'opacity="1"':'opacity="0"'} y="1217.88" width="14.94" height="10.2" id="IPR_UL6"></rect>
                        <path id="IPRX_UL6" class="na" ${IPRArray.UL6.I==1?'opacity="1"':'opacity="0"'} d="M810,1217l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(833 1180)">
                            <tspan x="0" y="0" ${IPRArray.UL6.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.UL6.T}</tspan>
                        </text>
                        <rect class="na" x="860" ${IPRArray.UL7.I==2?'opacity="1"':'opacity="0"'} y="1217.88" width="14.94" height="10.2" id="IPR_UL7"></rect>
                        <path id="IPRX_UL7" class="na" ${IPRArray.UL7.I==1?'opacity="1"':'opacity="0"'} d="M870,1217l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(890 1180)">
                            <tspan x="0" y="0" ${IPRArray.UL7.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.UL7.T}</tspan>
                        </text>
                        <rect class="na" x="918" ${IPRArray.UL8.I==2?'opacity="1"':'opacity="0"'} y="1217.88" width="14.94" height="10.2" id="IPR_UL8"></rect>
                        <path id="IPRX_UL8" class="na" ${IPRArray.UL8.I==1?'opacity="1"':'opacity="0"'} d="M928,1217l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(210 1330)">
                            <tspan x="0" y="0" ${IPRArray.LR8.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.LR8.T}</tspan>
                        </text>
                        <rect class="na" x="195" ${IPRArray.LR8.I==2?'opacity="1"':'opacity="0"'} y="1275" width="14.94" height="10.2" id="IPR_LR8"></rect>
                        <path id="IPRX_LR8" class="na" ${IPRArray.LR8.I==1?'opacity="1"':'opacity="0"'} d="M205,1275l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(260 1330)">
                            <tspan x="0" y="0" ${IPRArray.LR7.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.LR7.T}</tspan>
                        </text>
                        <rect class="na" x="245" ${IPRArray.LR7.I==2?'opacity="1"':'opacity="0"'} y="1275" width="14.94" height="10.2" id="IPR_LR7"></rect>
                        <path id="IPRX_LR7" class="na" ${IPRArray.LR7.I==1?'opacity="1"':'opacity="0"'} d="M255,1275l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(320 1330)">
                            <tspan x="0" y="0" ${IPRArray.LR6.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.LR6.T}</tspan>
                        </text>
                        <rect class="na" x="295" ${IPRArray.LR6.I==2?'opacity="1"':'opacity="0"'} y="1275" width="14.94" height="10.2" id="IPR_LR6"></rect>
                        <path id="IPRX_LR6" class="na" ${IPRArray.LR6.I==1?'opacity="1"':'opacity="0"'} d="M305,1275l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(365 1330)">
                            <tspan x="0" y="0" ${IPRArray.LR5.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.LR5.T}</tspan>
                        </text>
                        <rect class="na" x="345" ${IPRArray.LR5.I==2?'opacity="1"':'opacity="0"'} y="1275" width="14.94" height="10.2" id="IPR_LR5"></rect>
                        <path id="IPRX_LR5" class="na" ${IPRArray.LR5.I==1?'opacity="1"':'opacity="0"'} d="M355,1275l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(405 1330)">
                            <tspan x="0" y="0" ${IPRArray.LR4.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.LR4.T}</tspan>
                        </text>
                        <rect class="na" x="385" ${IPRArray.LR4.I==2?'opacity="1"':'opacity="0"'} y="1275" width="14.94" height="10.2" id="IPR_LR4"></rect>
                        <path id="IPRX_LR4" class="na" ${IPRArray.LR4.I==1?'opacity="1"':'opacity="0"'} d="M395,1275l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(450 1330)">
                            <tspan x="0" y="0" ${IPRArray.LR3.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.LR3.T}</tspan>
                        </text>
                        <rect class="na" x="425" ${IPRArray.LR3.I==2?'opacity="1"':'opacity="0"'} y="1275" width="14.94" height="10.2" id="IPR_LR3"></rect>
                        <path id="IPRX_LR3" class="na" ${IPRArray.LR3.I==1?'opacity="1"':'opacity="0"'} d="M435,1275l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(485 1330)">
                            <tspan x="0" y="0" ${IPRArray.LR2.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.LR2.T}</tspan>
                        </text>
                        <rect class="na" x="465" ${IPRArray.LR2.I==2?'opacity="1"':'opacity="0"'} y="1275" width="14.94" height="10.2" id="IPR_LR2"></rect>
                        <path id="IPRX_LR2" class="na" ${IPRArray.LR2.I==1?'opacity="1"':'opacity="0"'} d="M475,1275l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(525 1330)">
                            <tspan x="0" y="0" ${IPRArray.LR1.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.LR1.T}</tspan>
                        </text>
                        <rect class="na" x="505" ${IPRArray.LR1.I==2?'opacity="1"':'opacity="0"'} y="1275" width="14.94" height="10.2" id="IPR_LR1"></rect>
                        <path id="IPRX_LR1" class="na" ${IPRArray.LR1.I==1?'opacity="1"':'opacity="0"'} d="M515,1275l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(562 1330)">
                            <tspan x="0" y="0" ${IPRArray.LL1.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.LL1.T}</tspan>
                        </text>
                        <rect class="na" x="545" ${IPRArray.LL1.I==2?'opacity="1"':'opacity="0"'} y="1275" width="14.94" height="10.2" id="IPR_LL1"></rect>
                        <path id="IPRX_LL1" class="na" ${IPRArray.LL1.I==1?'opacity="1"':'opacity="0"'} d="M555,1275l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(600 1330)">
                            <tspan x="0" y="0" ${IPRArray.LL2.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.LL2.T}</tspan>
                        </text>
                        <rect class="na" x="585" ${IPRArray.LL2.I==2?'opacity="1"':'opacity="0"'} y="1275" width="14.94" height="10.2" id="IPR_LL2"></rect>
                        <path id="IPRX_LL2" class="na" ${IPRArray.LL2.I==1?'opacity="1"':'opacity="0"'} d="M595,1275l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(643 1330)">
                            <tspan x="0" y="0" ${IPRArray.LL3.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.LL3.T}</tspan>
                        </text>
                        <rect class="na" x="625" ${IPRArray.LL3.I==2?'opacity="1"':'opacity="0"'} y="1275" width="14.94" height="10.2" id="IPR_LL3"></rect>
                        <path id="IPRX_LL3" class="na" ${IPRArray.LL3.I==1?'opacity="1"':'opacity="0"'} d="M635,1275l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(683 1330)">
                            <tspan x="0" y="0" ${IPRArray.LL4.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.LL4.T}</tspan>
                        </text>
                        <rect class="na" x="665" ${IPRArray.LL4.I==2?'opacity="1"':'opacity="0"'} y="1275" width="14.94" height="10.2" id="IPR_LL4"></rect>
                        <path id="IPRX_LL4" class="na" ${IPRArray.LL4.I==1?'opacity="1"':'opacity="0"'} d="M675,1275l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(720 1330)">
                            <tspan x="0" y="0" ${IPRArray.LL5.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.LL5.T}</tspan>
                        </text>
                        <rect class="na" x="705" ${IPRArray.LL5.I==2?'opacity="1"':'opacity="0"'} y="1275" width="14.94" height="10.2" id="IPR_LL5"></rect>
                        <path id="IPRX_LL5" class="na" ${IPRArray.LL5.I==1?'opacity="1"':'opacity="0"'} d="M715,1275l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                        <text class="mv" transform="translate(780 1330)">
                            <tspan x="0" y="0" ${IPRArray.LL6.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.LL6.T}</tspan>
                        </text>
                        <rect class="na" x="750" ${IPRArray.LL6.I==2?'opacity="1"':'opacity="0"'} y="1275" width="14.94" height="10.2" id="IPR_LL6"></rect>
                        <path id="IPRX_LL6" class="na" ${IPRArray.LL6.I==1?'opacity="1"':'opacity="0"'} d="M760,1275l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                
                        <text class="mv" transform="translate(832.21 1325.79)">
                        <tspan x="0" y="0" ${IPRArray.LL7.T==0?'opacity="0"':'opacity="1"'} >${IPRArray.LL7.T}</tspan>
                        </text>
                        <rect class="na" x="800" ${IPRArray.LL7.I==2?'opacity="1"':'opacity="0"'} y="1275" width="14.94" height="10.2" id="IPR_LL7"></rect>
                        <path id="IPRX_LL7" class="na" ${IPRArray.LL7.I==1?'opacity="1"':'opacity="0"'} d="M810,1275l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
                
                        <rect class="na" x="860" ${IPRArray.LL8.I==2?'opacity="1"':'opacity="0"'} y="1275" width="14.94" height="10.2" id="IPR_LL8"></rect>
                        <path id="IPRX_LL8" class="na" ${IPRArray.LL8.I==1?'opacity="1"':'opacity="0"'} d="M870,1275l1.37,1.37-3.51,3.51,3.51,3.51-1.48,1.48-3.51-3.51-3.53,3.53-1.37-1.37,3.53-3.53-3.51-3.51,1.48-1.48,3.51,3.51,3.51-3.51Z">
                        </path>
            
                        <text class="ms" transform="translate(237.85 1040.58)">
                            <tspan x="0" y="0" xml:space="preserve">No Attachment on anterior</tspan>
                        </text>
                        <text class="ms" transform="translate(460.85 1040.58)">
                            <tspan x="0" y="0" xml:space="preserve">teeth Remove Attachment on Stage</tspan>
                        </text>
                        <text class="ms" transform="translate(750 1040.58)">
                            <tspan x="0" y="0" xml:space="preserve">Remove Attachment on Last Stage</tspan>
                        </text>
                        <rect fill="#${NoAttachmentonanterior==1?'7a74d1':'fff'}" stroke="#000" x="220" y="1027" width="16" height="16" id="NoAttachmentonanterior"></rect>
                        <rect fill="#${teethRemoveAttachmentonStage==1?'7a74d1':'fff'}" stroke="#000" x="442" y="1027" width="16" height="16" id="teethRemoveAttachmentonStage">
                        </rect>
                        <rect fill="#${RemoveAttachmentonLastStage==1?'7a74d1':'fff'}" stroke="#000" x="730" y="1027" width="16" height="16" id="RemoveAttachmentonLastStage"></rect>
                        <text class="ms" transform="translate(240.85 1099.58)">
                            <tspan x="0" y="0" xml:space="preserve">No IPR Required</tspan>
                        </text>
                        <text class="ms" transform="translate(444.85 1099.58)">
                            <tspan x="0" y="0" xml:space="preserve">IPR Required (Indicate in the diagram)</tspan>
                        </text>
                        <text class="ms" transform="translate(750 1099.58)">
                            <tspan x="0" y="0" xml:space="preserve">IPR as per software automation</tspan>
                        </text>
                        <rect fill="#${NoIPRRequired==1?'7a74d1':'fff'}" stroke="#000" x="220" y="1085" width="16" height="16" id="NoIPRRequired"></rect>
                        <rect fill="#${NoIPRRequired==2?'7a74d1':'fff'}" stroke="#000" x="425" y="1085" width="16" height="16" id="IPRRequired"></rect>
                        <rect fill="#${NoIPRRequired==3?'7a74d1':'fff'}" stroke="#000" x="730" y="1085" width="16" height="16" id="IPRaspersoftwareautomation"></rect>
                        <rect class="ne" y="1477.5" width="1073" height="33"></rect>
                        <g><text class="mu" transform="translate(389.97 126.43)">
                                <tspan x="0" y="0">www.parisaline.com</tspan>
                            </text><text class="mu" transform="translate(538.48 126.43)">
                                <tspan x="0" y="0" xml:space="preserve"> +33 1 88 31 14 54</tspan>
                            </text><text class="mu" transform="translate(671.46 126.43)">
                                <tspan x="0" y="0">info@parisaline.com</tspan>
                            </text><text></text>
                            <rect class="ne" x="518.93" y="114.83" width="14.68" height="14.68" rx="2.01" ry="2.01"></rect>
                            <rect class="ne" x="652.49" y="115.14" width="14.68" height="14.68" rx="1.99" ry="1.99"></rect>
                            <rect class="ne" x="368.13" y="115.51" width="14.68" height="14.68" rx="2.01" ry="2.01"></rect>
                            <g>
                                <path class="mk" d="M529.53,125.57l-.7,.7c-.07,.07-.18,.11-.28,.1-3.16-.21-5.72-2.72-5.98-5.91,0-.11,.03-.21,.1-.28l.73-.73c.15-.15,.4-.14,.53,.03l1.27,1.57c.12,.14,.1,.35-.02,.48l-.35,.35c-.11,.11-.14,.29-.06,.43,.45,.8,1.11,1.46,1.92,1.89,.14,.08,.31,.05,.42-.06l.34-.34c.13-.13,.34-.14,.48-.02l1.57,1.27c.16,.13,.18,.38,.03,.53Z">
                                </path>
                                <path class="mk" d="M528,122.84c-.15,0-.29-.1-.33-.25-.16-.63-.65-1.12-1.27-1.27-.18-.05-.29-.23-.24-.41,.05-.18,.23-.29,.41-.24,.87,.22,1.55,.89,1.76,1.76,.04,.18-.06,.36-.24,.41-.03,0-.05,0-.08,0Z">
                                </path>
                                <path class="mk" d="M529.64,122.84c-.17,0-.31-.12-.33-.29-.2-1.49-1.39-2.67-2.87-2.87-.18-.03-.31-.19-.29-.38,.03-.18,.2-.31,.38-.29,1.78,.25,3.2,1.66,3.45,3.45,.03,.18-.1,.35-.29,.38-.02,0-.03,0-.05,0Z">
                                </path>
                            </g>
                            <path id="mi" class="mk" d="M663.15,119.44h-6.65c-.61,0-1.11,.5-1.11,1.11v4.15c0,.61,.5,1.11,1.11,1.11h6.65c.61,0,1.11-.5,1.11-1.11v-4.15c0-.61-.5-1.11-1.11-1.11Zm-5.07,4.07l-1.11,1.11c-.05,.05-.12,.08-.2,.08s-.14-.03-.2-.08c-.11-.11-.11-.28,0-.39l1.11-1.11c.11-.11,.28-.11,.39,0,.11,.11,.11,.28,0,.39Zm1.74,.36c-.06,0-.12-.02-.18-.06l-3.05-2.49c-.12-.1-.14-.27-.04-.39,.1-.12,.27-.14,.39-.04l2.87,2.35,2.87-2.35c.12-.1,.29-.08,.39,.04s.08,.29-.04,.39l-3.05,2.49c-.05,.04-.11,.06-.18,.06Zm3.24,.75c-.05,.05-.12,.08-.2,.08s-.14-.03-.2-.08l-1.11-1.11c-.11-.11-.11-.28,0-.39s.28-.11,.39,0l1.11,1.11c.11,.11,.11,.28,0,.39Z">
                            </path>
                            <path class="mm" d="M378.6,119.71c-.83-.83-1.95-1.3-3.13-1.3s-2.3,.46-3.13,1.3c-.83,.83-1.3,1.95-1.3,3.13s.46,2.3,1.3,3.13c.83,.83,1.95,1.3,3.13,1.3s2.3-.46,3.13-1.3c.83-.83,1.3-1.95,1.3-3.13s-.46-2.3-1.3-3.13Zm-.48,.48c.23,.23,.42,.48,.59,.76h-1.31c-.08-.39-.2-.77-.36-1.13-.07-.17-.16-.33-.26-.49,.5,.19,.96,.48,1.34,.86Zm-1.2,2.66c0,.41-.03,.82-.08,1.23h-2.74c-.06-.41-.08-.82-.08-1.23s.03-.82,.08-1.23h2.74c.06,.41,.08,.82,.08,1.23Zm-2.41-2.76c.15-.35,.5-1,.96-1s.8,.64,.96,1c.12,.28,.21,.57,.28,.86h-2.48c.07-.29,.16-.59,.28-.86Zm-1.7,.1c.38-.38,.84-.68,1.34-.86-.1,.16-.18,.32-.26,.49-.16,.36-.27,.75-.36,1.13h-1.31c.16-.28,.36-.53,.59-.76Zm-1.1,2.66c0-.42,.07-.83,.2-1.23h1.51c-.05,.41-.08,.82-.08,1.23s.03,.82,.08,1.23h-1.51c-.14-.39-.2-.81-.2-1.23Zm1.1,2.66c-.23-.23-.42-.48-.59-.76h1.31c.08,.39,.2,.77,.36,1.13,.07,.17,.16,.33,.26,.49-.5-.19-.96-.48-1.34-.86Zm3.62,.1c-.15,.35-.5,1-.96,1s-.8-.64-.96-1c-.12-.28-.21-.57-.28-.86h2.48c-.07,.29-.16,.59-.28,.86Zm1.7-.1c-.38,.38-.84,.68-1.34,.86,.1-.16,.18-.32,.26-.49,.16-.36,.27-.75,.36-1.13h1.31c-.16,.28-.36,.53-.59,.76Zm-.61-1.43c.05-.41,.08-.82,.08-1.23s-.03-.82-.08-1.23h1.51c.14,.39,.2,.81,.2,1.23s-.07,.83-.2,1.23h-1.51Z">
                            </path>
                        </g>
                        <rect ${NoIPRRequired==2?'opacity="0"':'opacity="1"'} fill="#fff" stroke="#fff" x="50" y="1129" width="900" height="240" id="NoIPRRequired" style="width: 900px;height: 240px;y: 1129;x: 50;stroke: #fff;"></rect>
                    </svg>
                    `;
                        return Item;
                    
                    }
    
                HTTPs.POST(CONFIG.serverUrl+"/P/GetId",{id:this.idPatient}).then(res=>{
                    res=JSON.parse(res);
                    if(res.message==2000)
                    {
                        
                        // $('#formInformationPatient #fullName').val(res.data[0].firstName);
                        // dt.setDate(new Date(res.data[0].birthDate),true);
                        // $('#formInformationPatient #gender').val(res.data[0].gender);
                        // $('#formInformationPatient #imagePatient').attr("src",CONFIG.serverImageUrl+res.data[0].image);
                        // $scope.Status=res.data[0];
                        const getBase64FromUrl = async (url) => {
                        const data = await fetch(url);
                        const blob = await data.blob();
                        return new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(blob); 
                            reader.onloadend = () => {
                            const base64data = reader.result;   
                            resolve(base64data);
                            }
                        });
                        }
                        let shiipingAddress=$scope.DataAdress.find(x=>x.id==$scope.shippingId);
                        console.log(shiipingAddress);
                        getBase64FromUrl(CONFIG.serverImageUrl+res.data[0].image).then((resUltImage)=>{
                        var PdfTemplete = {
                            header: [
                                {
                                    
                                },
            
                            ],
                            content:[
                                {
                                    columns: [
                                        {
                                            svg:RenderIpr($scope.IPRArray,resUltImage,$scope.idPatient,res.data[0].firstName,res.data[0].gender,new Date(),new Date(res.data[0].birthDate),
                                            $scope.posteriorSpacingItems.find(x=>x.id==$scope.posteriorSpacing).label,
                                            $scope.posteriorArchWdithItems.find(x=>x.id==$scope.posteriorArchWdith).label,
                                            $scope.posteriorPosteriorCrossBiteItems.find(x=>x.id== $scope.posteriorPosteriorCrossBite).label,
                                            $scope.incisorsMidlineItems.find(x=>x.id==$scope.incisorsMidline).label,
                                            $scope.incisorsOverbiteItems.find(x=>x.id==$scope.incisorsOverbite).label,
                                            $scope.incisorsOverjetItems.find(x=>x.id==$scope.incisorsOverjet).label,
                                            $scope.classDesiredMRigthItems.find(x=>x.id==$scope.classDesiredMRigth).label,
                                            $scope.classDesiredMLeftItems.find(x=>x.id==$scope.classDesiredMLeft).label,
                                            $scope.classDesiredRRigthItems.find(x=>x.id==$scope.classDesiredRRigth).label,
                                            $scope.classDesiredRLeftItems.find(x=>x.id==$scope.classDesiredRLeft).label,
                                            $scope.crowdingProclineMandibular,
                                            $scope.crowdingProclineMaxillar,
                                            $scope.crowdingExpandMandibular,
                                            $scope.crowdingExpandMaxillar,
                                            $scope.noAttachment,
                                            $scope.removeAttachmentonstage,
                                            $scope.removeAttachmentonlaststage,
                                            $scope.iPRInstructions,
                                            $scope.tretmentGols,
                                            shiipingAddress?shiipingAddress.fullName+" "+shiipingAddress.countryName+" "+shiipingAddress.cityName+" "+shiipingAddress.address1+" "+shiipingAddress.address2:'N/A'
                                            ),
                                            width: 600,
                                            margin: [-40, -40, 0, 0],
                                        }
                                    ]
                                },
                                {
                                    columns: [
                                            {
                                            text: $scope.tretmentGols,
                                            style:'textWorp'
                                        }
                                    ]
                                }
                            ],
                            styles: {
                                textWorp: {
                                    fontSize: 10,
                                    bold: true,
                                    margin: [0, -640, 0, 10],
                                    height:100
                                }
                            },
                        }
                            pdfMake.createPdf(PdfTemplete).download(this.idPatient+".pdf");
                        });
    
                    }
                });
    
                }
            var newOrder=()=>{
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
    
                  document.getElementById('Universal').addEventListener('click',(e)=>{
                    changeAll('Palmar');
                  });
    
                  document.getElementById('Palmar').addEventListener('click',(e)=>{
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
                      else if(e.target.id == "TreatWithExtraction")
                      {
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
    
                  var valueCreateOeder={};
                  $scope.getAllValues=()=> {
                    var ErrorNumber=0;
                    valueCreateOeder['ArchesToTreatItem']=document.getElementById('ArchesToTreatItem').querySelector('input[name="ArchesToTreat"]:checked')?.getAttribute('idValue');
                    if(valueCreateOeder['ArchesToTreatItem']===undefined)
                    {
                        document.getElementById('ArchesToTreatItem').style.border="4px solid #e65959";
                        document.getElementById('ArchesToTreatItem').style.borderRadius="6px";
                        try{
                            var ele = document.getElementById('ArchesToTreatItem');
                            document.getElementById('ErrorArchesToTreatItem').innerHTML="This section is mandatary, please select an option";
                            window.scrollTo(ele.offsetLeft,ele.offsetTop);
                        }
                        catch{
    
                        }
                        ErrorNumber++;
                    }
                    else{
                        document.getElementById('ArchesToTreatItem').style.border="none";
                    }
              
                    //TeethNOTToIncludeInMovementItem
                    TeethNOTToIncludeInMovementVal=[];
                    TeethNOTToIncludeInMovementElements=document.getElementById('TeethNOTToIncludeInMovementItem').querySelectorAll('input');
              
                    for (let i = 0; i < TeethNOTToIncludeInMovementElements.length; i++) {
                      TeethNOTToIncludeInMovementVal.push({name:TeethNOTToIncludeInMovementElements[i].id.split('TeethNotToIncludeInMovement')[1],value:TeethNOTToIncludeInMovementElements[i].checked})
                    }
                    valueCreateOeder['TeethNOTToIncludeInMovementItem']=TeethNOTToIncludeInMovementVal;
                    
                    //TeethNOTToPlaceSttachmentsOnItem
                    TeethNOTToPlaceSttachmentsOnVal=[];
                    TeethNOTToPlaceSttachmentsOnElements=document.getElementById('TeethNOTToPlaceSttachmentsOnItem').querySelectorAll('input');
                    for (let i = 0; i < TeethNOTToPlaceSttachmentsOnElements.length; i++) {
                      TeethNOTToPlaceSttachmentsOnVal.push({name:TeethNOTToPlaceSttachmentsOnElements[i].id.split('TeethNotToPlaceAttachmentsOn')[1],value:TeethNOTToPlaceSttachmentsOnElements[i].checked})
                    }
                    valueCreateOeder['TeethNOTToPlaceSttachmentsOnItem']=TeethNOTToPlaceSttachmentsOnVal;
                    //Crowding
                    valueCreateOeder['CrowdingUpperArch']=document.querySelector('#CrowdingItem  input[name="TreatUpper"]:checked')?.id;
                    valueCreateOeder['CrowdingLowerArch']=document.querySelector('#CrowdingItem  input[name="TreatLower"]:checked')?.id;
                    var TreatUpper=document.querySelectorAll('#TreatUpper  input:checked');
                    if(TreatUpper.length==0 && valueCreateOeder['CrowdingUpperArch']==="Treat")
                    {
                        document.querySelector('#CrowdingItem  #lableTreatUpper').style.borderBottom="1px solid #ff0404";
                        ErrorNumber++;
                    }else{
                        document.querySelector('#CrowdingItem  #lableTreatUpper').style.borderBottom='none';
                        let arrayTreatUpper=[];
                        TreatUpper.forEach(res=>{
                            arrayTreatUpper.push(res.id);
                        });
                        valueCreateOeder['CrowdingUpperTreat']=JSON.stringify(arrayTreatUpper);
                    }
                    var TreatLower=document.querySelectorAll('#TreatLower  input:checked');
                    if(TreatLower.length==0 && valueCreateOeder['CrowdingLowerArch'] ==="Treat" )
                    {
                        document.querySelector('#CrowdingItem  #lableTreatLower').style.borderBottom="1px solid #ff0404";
                        ErrorNumber++;
                    }else{
                        document.querySelector('#CrowdingItem  #lableTreatLower').style.borderBottom='none';
                        let arrayTreatLower=[];
                        TreatLower.forEach(res=>{
                            arrayTreatLower.push(res.id);
                        });
                        valueCreateOeder['CrowdingLowerTreat']=JSON.stringify(arrayTreatLower);
                    }
              
                    if(valueCreateOeder['CrowdingUpperArch']===undefined || valueCreateOeder['CrowdingLowerArch']===undefined)
                    {
                        document.getElementById('CrowdingItem').style.border="4px solid #e65959";
                        document.getElementById('CrowdingItem').style.borderRadius="6px";
                        try{
                            var ele = document.getElementById('CrowdingItem');  
                            document.getElementById('ErrorCrowdingItem').innerHTML="Please select an option for upper arch, and lower arch"; 
                            window.scrollTo(ele.offsetLeft,ele.offsetTop);
                        }
                        catch{
                            
                        }
                        ErrorNumber++;
                    }
                    else{
                        document.getElementById('CrowdingItem').style.border="none";
                    }
              
                    //IPR CROWDING
                    CrowdingIPRVal=[];
                    CrowdingIPRElements=document.getElementById('Crowding').querySelectorAll('input');
                    for (let i = 0; i < CrowdingIPRElements.length; i++) {
                      CrowdingIPRVal.push({name:CrowdingIPRElements[i].id.split('Crowding')[1],value:CrowdingIPRElements[i].checked})
                    }
                    valueCreateOeder['CrowdingIPR']=CrowdingIPRVal;
              
                    //SpacesItem
                    valueCreateOeder['SpacesItem']=document.querySelector('#SpacesItem input[name="Spaces"]:checked')?.id;
                    if(valueCreateOeder['SpacesItem']===undefined)
                    {
                        document.getElementById('SpacesItem').style.border="4px solid #e65959";
                        document.getElementById('SpacesItem').style.borderRadius="6px";
                        try{
                            var ele = document.getElementById('SpacesItem');  
                            document.getElementById('ErrorSpacesItem').innerHTML="This section is mandatary, please select an option"; 
                            window.scrollTo(ele.offsetLeft,ele.offsetTop);
                        }
                        catch{
                            
                        }
                        ErrorNumber++;
                    }
                    else{
                        document.getElementById('SpacesItem').style.border="none";
                    }
              
                    //IPR Spaces
                    SpacesIPRVal=[];
                    SpacesIPRElements=document.getElementById('SpacesItem').querySelectorAll('#Spaces input');
                    for (let i = 0; i < SpacesIPRElements.length; i++) {
                      SpacesIPRVal.push({name:SpacesIPRElements[i].id.split('Spaces')[1],value:SpacesIPRElements[i].checked})
                    }
                    valueCreateOeder['SpacesIPR']=SpacesIPRVal;
    
                    valueCreateOeder['PosteriorCrossBiteItem']=document.querySelector('#PosteriorCrossBiteItem input:checked')?.id;
                    if(valueCreateOeder['PosteriorCrossBiteItem']===undefined)
                    {
                        document.getElementById('PosteriorCrossBiteItem').style.border="4px solid #e65959";
                        document.getElementById('PosteriorCrossBiteItem').style.borderRadius="6px";
                        try{
                            var ele = document.getElementById('PosteriorCrossBiteItem');   
                            document.getElementById('ErrorPosteriorCrossBiteItem').innerHTML="This section is mandatary, please select an option"; 
                            window.scrollTo(ele.offsetLeft,ele.offsetTop);
                        }
                        catch{
                            
                        }
                        ErrorNumber++;
                    }
                    else{
                        document.getElementById('PosteriorCrossBiteItem').style.border="none";
                    }
              
                    //MidlinesItem
                    valueCreateOeder['MidlinesItemUpper']=document.querySelector('#MidlinesItem input[name="MidlinesUpper"]:checked')?.id;
                    valueCreateOeder['MidlinesItemLower']=document.querySelector('#MidlinesItem input[name="MidlinesLower"]:checked')?.id;
              
                    if(valueCreateOeder['MidlinesItemUpper']===undefined || valueCreateOeder['MidlinesItemLower']===undefined)
                    {
                        document.getElementById('MidlinesItem').style.border="4px solid #e65959";
                        document.getElementById('MidlinesItem').style.borderRadius="6px";
                        try{
                            var ele = document.getElementById('MidlinesItem');   
                            document.getElementById('ErrorMidlinesItem').innerHTML="Please select an option for upper midlines, and lower midlines"; 
                            window.scrollTo(ele.offsetLeft,ele.offsetTop);
                        }
                        catch{
                            
                        }
                        ErrorNumber++;
                    }
                    else{
                        document.getElementById('MidlinesItem').style.border="none";
                    }
                    //OverBiteItem
                    valueCreateOeder['OverBiteItem']=document.querySelector('#OverBiteItem input[name="OverBite"]:checked')?.id;
                    if(valueCreateOeder['OverBiteItem']===undefined)
                    {
                        document.getElementById('OverBiteItem').style.border="4px solid #e65959";
                        document.getElementById('OverBiteItem').style.borderRadius="6px";
                        try{
                            var ele = document.getElementById('OverBiteItem');   
                            document.getElementById('ErrorOverBiteItem').innerHTML="This section is mandatary, please select an option"; 
                            window.scrollTo(ele.offsetLeft,ele.offsetTop);
                        }
                        catch{
                            
                        }
                        ErrorNumber++;
                    }
                    else{
                        document.getElementById('OverBiteItem').style.border="none";
                    }
                    valueCreateOeder['OverBiteDeepBite']=[
                     { 'IntrudeAnteriorTeeth':{
                        Upper:document.querySelector('#OverBiteItem #DeepBite #IntrudeAnteriorTeeth #Upper').checked,
                        Lower:document.querySelector('#OverBiteItem #DeepBite #IntrudeAnteriorTeeth #Lower').checked
                      }},
                      {'IntrudeAnteriorTeethAndExtrudePremolars':{
                        Upper:document.querySelector('#OverBiteItem #DeepBite #IntrudeAnteriorTeethAndExtrudePremolars #Upper').checked,
                        Lower:document.querySelector('#OverBiteItem #DeepBite #IntrudeAnteriorTeethAndExtrudePremolars #Lower').checked
                      }}
                    ];
    
                    valueCreateOeder['OverBiteOpenBite']=[
                     { 'ExtrudeAnteriorTeeth':{
                        Upper:document.querySelector('#OverBiteItem #OpenBite #ExtrudeAnteriorTeeth #Upper').checked,
                        Lower:document.querySelector('#OverBiteItem #OpenBite #ExtrudeAnteriorTeeth #Lower').checked
                      }},
                      {'ExtrudeAnteriorTeethAndIntrudePremolars':{
                        Upper:document.querySelector('#OverBiteItem #OpenBite #ExtrudeAnteriorTeethAndIntrudePremolars #Upper').checked,
                        Lower:document.querySelector('#OverBiteItem #OpenBite #ExtrudeAnteriorTeethAndIntrudePremolars #Lower').checked
                      }}
                    ];
                    if(valueCreateOeder['OverBiteItem']==="CorrectOpenBite" && valueCreateOeder['OverBiteOpenBite'][0].ExtrudeAnteriorTeeth.Lower===false && valueCreateOeder['OverBiteOpenBite'][0].ExtrudeAnteriorTeeth.Upper===false  && valueCreateOeder['OverBiteOpenBite'][1].ExtrudeAnteriorTeethAndIntrudePremolars.Upper===false && valueCreateOeder['OverBiteOpenBite'][1].ExtrudeAnteriorTeethAndIntrudePremolars.Lower===false){
                         document.getElementById('lableCorrectOpenBite').style.borderBottom="1px solid #ff0404";
                         ErrorNumber++;
                    }
                    else{
                        document.getElementById('lableCorrectOpenBite').style.borderBottom="none";
                    }
                    if(valueCreateOeder['OverBiteItem']==="CorrectDeepBite" && valueCreateOeder['OverBiteDeepBite'][0].IntrudeAnteriorTeeth.Lower===false && valueCreateOeder['OverBiteDeepBite'][0].IntrudeAnteriorTeeth.Upper===false  && valueCreateOeder['OverBiteDeepBite'][1].IntrudeAnteriorTeethAndExtrudePremolars.Upper===false && valueCreateOeder['OverBiteDeepBite'][1].IntrudeAnteriorTeethAndExtrudePremolars.Lower===false){
                        document.getElementById('lableCorrectDeepBite').style.borderBottom="1px solid #ff0404";
                        ErrorNumber++;
                    }
                    else{
                        document.getElementById('lableCorrectDeepBite').style.borderBottom="none";
                    }
              
                    //OverJetItem
                    valueCreateOeder['OverJetItem']=document.querySelector('#OverJetItem input[name="OverJet"]:checked')?.id;
                    valueCreateOeder['CorrectOverjet']=document.querySelector('#boxCorrectOverjet input[name="CorrectOverjet"]:checked')?.id;
                    if(valueCreateOeder['OverJetItem']==="CorrectOverjet" &&  valueCreateOeder['CorrectOverjet']===undefined)
                    {
                        document.getElementById('lableCorrectOverjet').style.borderBottom="1px solid #ff0404";
                        ErrorNumber++;
                    }else{
                        document.getElementById('lableCorrectOverjet').style.borderBottom="none";
                    }
                    if(valueCreateOeder['OverJetItem']===undefined)
                    {
                        document.getElementById('OverJetItem').style.border="4px solid #e65959";
                        document.getElementById('OverJetItem').style.borderRadius="6px";
                        try{
                            var ele = document.getElementById('OverJetItem');  
                            document.getElementById('ErrorOverJetItem').innerHTML="This section is mandatary, please select an option";  
                            window.scrollTo(ele.offsetLeft,ele.offsetTop);
                        }
                        catch{
                            
                        }
                        ErrorNumber++;
                    }
                    else{
                        document.getElementById('OverJetItem').style.border="none";
                    }
                    
              
                    //Elastic Cuts / Button Cuts
                    
                    //IPR PlaceElasticCutsOn
                    ElasticCutsButtonCutsIPRVal=[];
                    ElasticCutsButtonCutsIPRElements=document.getElementById('ElasticCutsButtonCutsItem').querySelectorAll('#PlaceElasticCutsOn input');
                    for (let i = 0; i < SpacesIPRElements.length; i++) {
                      ElasticCutsButtonCutsIPRVal.push({name:ElasticCutsButtonCutsIPRElements[i].id.split('PlaceElasticCutsOn')[1],value:ElasticCutsButtonCutsIPRElements[i].checked})
                    }
                    valueCreateOeder['PlaceElasticCutsOn']=ElasticCutsButtonCutsIPRVal;
              
                    //IPR PlaceButtonCutsOn
                    PlaceButtonCutsOnIPRVal=[];
                    PlaceButtonCutsOnIPRElements=document.getElementById('ElasticCutsButtonCutsItem').querySelectorAll('#PlaceButtonCutsOn input');
                    for (let i = 0; i < SpacesIPRElements.length; i++) {
                      PlaceButtonCutsOnIPRVal.push({name:PlaceButtonCutsOnIPRElements[i].id.split('PlaceElasticCutsOn')[1],value:PlaceButtonCutsOnIPRElements[i].checked})
                    }
                    valueCreateOeder['PlaceButtonCutsOn']=ElasticCutsButtonCutsIPRVal;
              
                    //TreatmentGoalsAdditionalInstructionsItem
                    valueCreateOeder['TreatmentGoalsAdditionalInstructionsItem']=document.querySelector('#TreatmentGoalsAdditionalInstructionsItem textarea').value;
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
                    if(ErrorNumber==0)
                    {
                        return valueCreateOeder;
                    }
                    else{
                        return false;
                    }
    
                  }
                  
                  
            }
    
            var loadValue=(data)=>{
                console.log(data);
                document.querySelector('#ArchesToTreatItem #ArchesToTreat'+data.ArchesToTreatItem).click();
                let TeethNOTToIncludeInMovementItem=JSON.parse(data.TeethNOTToIncludeInMovementItem);
                for (var i=0;i<TeethNOTToIncludeInMovementItem.length;i++) {
                    document.querySelector('#TeethNOTToIncludeInMovementItem #TeethNotToIncludeInMovement'+TeethNOTToIncludeInMovementItem[i].name).checked=TeethNOTToIncludeInMovementItem[i].value;
                }
    
                let TeethNOTToPlaceSttachmentsOnItem=JSON.parse(data.TeethNOTToPlaceSttachmentsOnItem);
                for (var i=0;i<TeethNOTToPlaceSttachmentsOnItem.length;i++) {
                    document.querySelector('#TeethNOTToPlaceSttachmentsOnItem #TeethNotToPlaceAttachmentsOn'+TeethNOTToPlaceSttachmentsOnItem[i].name).checked=TeethNOTToPlaceSttachmentsOnItem[i].value;
                }
    
                document.querySelector('#CrowdingItem #UpperArch #'+data.CrowdingUpperArch)?.click();
                document.querySelector('#CrowdingItem #LowerArch #'+data.CrowdingLowerArch)?.click();
                if(data.CrowdingUpperTreat !== null && data.CrowdingUpperTreat !=='')
                {
                    let CrowdingUpperTreat=JSON.parse(data.CrowdingUpperTreat);
                    if(typeof CrowdingUpperTreat==="string"){
                        CrowdingUpperTreat=JSON.parse(CrowdingUpperTreat);
                    }
                    CrowdingUpperTreat.forEach(res=>{
                        document.querySelector('#CrowdingItem #UpperArch #TreatUpper #'+res)?.click();
                    });
                }
    
                if(data.CrowdingLowerTreat !== null && data.CrowdingLowerTreat !=='')
                {
                    let CrowdingLowerTreat=JSON.parse(data.CrowdingLowerTreat);
                    if(typeof CrowdingLowerTreat==="string"){
                        CrowdingLowerTreat=JSON.parse(CrowdingLowerTreat);
                    }
                    CrowdingLowerTreat.forEach(res=>{
                        document.querySelector('#CrowdingItem #LowerArch #TreatLower #'+res)?.click();
                    });
                }
                // document.querySelector('#CrowdingItem #UpperArch #TreatUpper #'+data.CrowdingUpperTreat)?.click();
                // document.querySelector('#CrowdingItem #LowerArch #TreatLower #'+data.CrowdingLowerTreat)?.click();
    
                let CrowdingIPR=JSON.parse(data.CrowdingIPR);
                if(typeof CrowdingIPR==="string"){
                    CrowdingIPR=JSON.parse(CrowdingIPR);
                }
                for (var i=0;i<CrowdingIPR.length;i++) {
                    document.querySelector('#CrowdingItem #Crowding'+CrowdingIPR[i].name).checked=CrowdingIPR[i].value;
                }
    
                document.querySelector('#SpacesItem #'+data.SpacesItem).click();
    
                let SpacesIPR=JSON.parse(data.SpacesIPR);
                if(typeof SpacesIPR==="string"){
                    SpacesIPR=JSON.parse(SpacesIPR);
                }
                for (var i=0;i<SpacesIPR.length;i++) {
                    document.querySelector('#SpacesItem #Spaces'+SpacesIPR[i].name).checked=SpacesIPR[i].value;
                }
    
    
                document.querySelector('#PosteriorCrossBiteItem #'+data.PosteriorCrossBiteItem)?.click();
                document.querySelector('#MidlinesItem #MidlinesUpper #'+data.MidlinesItemUpper)?.click();
                document.querySelector('#MidlinesItem #MidlinesLower #'+data.MidlinesItemLower)?.click();
    
                //OverBiteItem
                document.querySelector('#OverBiteItem #'+data.OverBiteItem).click();
                data.OverBiteDeepBite=JSON.parse(data.OverBiteDeepBite);
                if(typeof data.OverBiteDeepBite==="string")
                {
                    data.OverBiteDeepBite=JSON.parse(data.OverBiteDeepBite);
                }
    
                document.querySelector('#OverBiteItem #DeepBite #IntrudeAnteriorTeeth #Lower').checked=data.OverBiteDeepBite[0].IntrudeAnteriorTeeth.Lower;
                document.querySelector('#OverBiteItem #DeepBite #IntrudeAnteriorTeeth #Upper').checked=data.OverBiteDeepBite[0].IntrudeAnteriorTeeth.Upper;
                document.querySelector('#OverBiteItem #DeepBite #IntrudeAnteriorTeethAndExtrudePremolars #Lower').checked=data.OverBiteDeepBite[1].IntrudeAnteriorTeethAndExtrudePremolars.Lower;
                document.querySelector('#OverBiteItem #DeepBite #IntrudeAnteriorTeethAndExtrudePremolars #Upper').checked=data.OverBiteDeepBite[1].IntrudeAnteriorTeethAndExtrudePremolars.Upper;
                
                
                data.OverBiteOpenBite=JSON.parse(data.OverBiteOpenBite);
                if(typeof data.OverBiteOpenBite==="string"){
                    data.OverBiteOpenBite=JSON.parse(data.OverBiteOpenBite);
                }
                if(data.OverBiteOpenBite!=null)
                {
                    document.querySelector('#OverBiteItem #OpenBite #ExtrudeAnteriorTeeth #Lower').checked=data.OverBiteOpenBite[0].ExtrudeAnteriorTeeth.Lower;
                    document.querySelector('#OverBiteItem #OpenBite #ExtrudeAnteriorTeeth #Upper').checked=data.OverBiteOpenBite[0].ExtrudeAnteriorTeeth.Upper;
                    document.querySelector('#OverBiteItem #OpenBite #ExtrudeAnteriorTeethAndIntrudePremolars #Lower').checked=data.OverBiteOpenBite[1].ExtrudeAnteriorTeethAndIntrudePremolars.Lower;
                    document.querySelector('#OverBiteItem #OpenBite #ExtrudeAnteriorTeethAndIntrudePremolars #Upper').checked=data.OverBiteOpenBite[1].ExtrudeAnteriorTeethAndIntrudePremolars.Upper;
                    
                }
                document.querySelector('#OverJetItem #'+data.OverJetItem).click();
                document.querySelector('#OverJetItem #boxCorrectOverjet #'+data.CorrectOverjet)?.click();
    
                //PlaceElasticCutsOn
                var PlaceElasticCutsOn=JSON.parse(data.PlaceElasticCutsOn);
                if(typeof PlaceElasticCutsOn=="string")
                {
                    PlaceElasticCutsOn=JSON.parse(PlaceElasticCutsOn);
                }
                for (var i=0;i<PlaceElasticCutsOn.length;i++) {
                    document.querySelector('#ElasticCutsButtonCutsItem #PlaceElasticCutsOn'+PlaceElasticCutsOn[i].name).checked=PlaceElasticCutsOn[i].value;
                }
    
    
                //PlaceButtonCutsOn
                let PlaceButtonCutsOn=JSON.parse(data.PlaceButtonCutsOn);
                if(typeof PlaceButtonCutsOn=="string")
                {
                    PlaceButtonCutsOn=JSON.parse(PlaceButtonCutsOn);
                }
                for (var i=0;i<PlaceButtonCutsOn.length;i++) {
                    document.querySelector('#ElasticCutsButtonCutsItem #PlaceButtonCutsOn'+PlaceButtonCutsOn[i].name).checked=PlaceButtonCutsOn[i].value;
                }
    
    
                //TreatmentGoalsAdditionalInstructionsItem
                document.querySelector('#TreatmentGoalsAdditionalInstructionsItem textarea').value=data.TreatmentGoalsAdditionalInstructionsItem;
                $('#itemCreateOrder input').prop('disabled', true);
            }
    
            $scope.submitionText={};
            $scope.loadSubmitionText=()=>{
                HTTPs.POST(CONFIG.serverUrl+'/submtion/getAll',{}).then(res=>{
                    res=JSON.parse(res);
                    $scope.$apply(()=>{
                        for (let i = 0; i < res.length; i++) {
                            $scope.submitionText[res[i].nameKey]=res[i];
                        }
                    });
                });
            }
            $scope.loadSubmitionText();
    
            $scope.contentSubmtion='';
            $scope.openMoedelSubmtion=(Content)=>{
                $('#minContent').html(Content);
                $('#modelContentSubmtion').modal('show');
            }
        }
    }],
    Templete:"Views/Cases/Components/CreateOrder.html?"+VERSTION,
    Paramter:{ 
        filters: '@',
        buttonNext: '&',
        idPatient: '<',
        deleteCases: '<',
    }
}
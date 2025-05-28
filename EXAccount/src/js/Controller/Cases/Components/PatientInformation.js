$ANComponent.patientInformation={
    FUN:['$scope','$location',function($scope,$location) {
        this.$onInit = function() {
            $scope.datatest=this.filters;
            $scope.Create=()=>{
               let Vform= Validate(document.getElementById('formInformationPatient'));
               if(!Vform)
               {
                   return;
               }
               if($('#BirthDate').val()=="")
               {
                    $('#BirthDate').addClass("errorInput");
                    $('#BirthDate').removeClass("sucssInput");
                    $('#ErrorMessageDate').html($('#ErrorMessageDate').attr("titleError"));
                   return;
               }
               else{
                $('#ErrorMessageDate').html("");
                $('#BirthDate').removeClass("errorInput");
                $('#BirthDate').addClass("sucssInput");
               }
               var dataF=new FormData();
               dataF.append("fileData",FileUpload);
               var dataF=new FormData();
               dataF.append("fileData",FileUpload);
               let dateTemp=$('#BirthDate').val();
                dateTemp=dateTemp.split("-");
               let dateR=new Date(dateTemp[1]+"/"+dateTemp[0]+"/"+dateTemp[2]);
               Vform['BirthDate']=dateR;
               Reloader.Start('#formInformationPatient');
               HTTPs.POST(CONFIG.serverUrl+"/P/Create",dataF,Vform).then(res=>{
                   res=JSON.parse(res);
                   if(res.message==2000){
                        Reloader.Stop('#formInformationPatient');
                        $scope.$apply(()=>{
                            $location.path("/Cases/"+$CRID.TO(res.id.toString())).search({TB: 'patientRecords',TA:"patientInformation"});
                            this.buttonNext();
                        });
                   }
               });
            };
            $scope.nextTab=()=>{
                this.buttonNext();
            }
            $scope.update=()=>{
                let Vform= Validate(document.getElementById('formInformationPatient'));
                if(!Vform)
                {
                    return;
                }
                Vform['id']=this.idPatient;
                var dataF=new FormData();
                dataF.append("fileData",FileUpload);
                let dateTemp=$('#BirthDate').val();
                dateTemp=dateTemp.split("-");
               let dateR=new Date(dateTemp[1]+"/"+dateTemp[0]+"/"+dateTemp[2]);
               Vform['BirthDate']=dateR;
                HTTPs.POST(CONFIG.serverUrl+"/P/Update",dataF,Vform).then(res=>{
                    $scope.$apply(()=>{
                        $scope.EditForm=false;
                    });
                
                });
            }
            $scope.openFIle=(e)=>{
                ImageELement=e.target;
                $('#imagePatientFile').click();
            }
            var FileUpload=null;
            $('#imagePatientFile').on('change',(evt)=>{
                var tgt = evt.target || window.event.srcElement,
                files = tgt.files;
        
                // FileReader support
                if (FileReader && files && files.length) {
                    let typeFile=files[0].name;
                    typeFile=typeFile.split(".");
                    if(typeFile.length > 1)
                    {
                        typeFile=typeFile[typeFile.length-1].toUpperCase();
                        
                    }
                    else{
                        return ;
                    }
                    if(typeFile=="PNG" || typeFile=="JPG" || typeFile=="JPEG" || typeFile=="GIF")
                    {
                        var fr = new FileReader();
                        fr.onload =  ()=> {
                            ImageELement.src = fr.result;
                        }
                        fr.readAsDataURL(files[0]);
                        FileUpload=files[0];
                    }
                    else{
                        Tost.warning("Invalid file type","Allowed files .png .jpeg .jpg",3000);
                    }
                }
            
                // Not supported
                else {
                    // fallback -- perhaps submit the input to an iframe and temporarily store
                    // them on the server until the user's session ends.
                }
            });
    
            const dt=flatpickr("#BirthDate",{
                maxDate: "2010-01-01",
                dateFormat: "d-m-Y",
            });
            $scope.EditForm=false;
            //get Information Patient
            $scope.getAll=()=>{
                if(this.idPatient!=-1)
                {
                    HTTPs.POST(CONFIG.serverUrl+"/P/GetId",{id:this.idPatient}).then(res=>{
                        res=JSON.parse(res);
                        if(res.message==2000)
                        {
                            $('#formInformationPatient #fullName').val(res.data[0].firstName);
                            dt.setDate(new Date(res.data[0].birthDate),true);
                            $('#formInformationPatient #gender').val(res.data[0].gender);
                            $('#formInformationPatient #imagePatient').attr("src",CONFIG.serverImageUrl+res.data[0].image);
                           // $scope.Status=res.data[0];
                        }
                    });
                }
                else{
                    $scope.EditForm=true;
                }
            }
            $scope.getAll();
    
            $scope.editForm=()=>{
                $scope.EditForm=true;
            }
            $scope.DeleteCases=()=>{
                HTTPs.POST(CONFIG.serverUrl+"/P/Delete",{idPatient:this.idPatient}).then(res=>{
                    res=JSON.parse(res);
                    if(res.message==2003)
                    {
                        Tost.warning("Deleted successfully","The patient has been removed successfully ",3000);
                        $scope.$apply(()=>{
                            $location.path("/");
                        });
                    }
                });
            }
        }
    }],
    Templete:"Views/Cases/Components/PatientInformation.html",
    Paramter:{ 
        filters: '@',
        buttonNext: '&',
        idPatient: '<',
        deleteCases: '<',
    }
}

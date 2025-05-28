



//ajax



var HTTPs={
    Token:null,
    POST:function(Link,data,params={},funProgras=null){
        return new Promise(function(resolve, reject) {
            let url = new URL(Link);
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            let Headers={};
            Headers['Authorization']="Bearer "+HTTPs.Token;
            if(!data.values)
            {
               Headers['content-type']="application/json";
               data=JSON.stringify(data);
            }
            fetch(url, {
               "headers": Headers,
               "body": data,
               "method": "POST",
               }).then(res=>{
                   if(funProgras)
                   {
                    PrograssK(res.body.getReader());
                   }
                   else{
                    resolve(res.text());
                   }
                 })
                 .catch(err=>{
                   reject(err.text());  
                });
                function PrograssK(reader) {
                    var total = 0
                    function pump() {
                        reader.read().then(({done, value}) => {
                          if (done) {
                            resolve(done);
                            return
                          }
                          total += value.byteLength
                          funProgras({NOW:value.byteLength,TOTAL:total});
                          pump()
                        }).catch(err=>reject(err));
                    }
                    pump()
                 }
       });
        
    },
    POSTFile:function(Link,data,params={},funProgras=null){
        return new Promise(function(resolve, reject) {
            let url = new URL(Link);
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            var xhr = new XMLHttpRequest();
            xhr.upload.onload =function(){
                console.log('The upload is completed:'+xhr.status+xhr.response);
            }
            xhr.upload.onerror =function(){
                console.error('Upload failed.');
            }
            xhr.upload.onabort =function(){
                console.error('Upload cancelled.');
            }
            xhr.upload.onprogress = function(event){
                funProgras({loaded:event.loaded,total:event.total });
            }
            xhr.upload.addEventListener('progress', (e)=>{
                if(funProgras)
                {
                   // funProgras("C");
                }
            }, false)
            xhr.onreadystatechange = function(){ 
                if ( xhr.readyState == 4 ) { 
                  if ( xhr.status == 200 ) { 
                    resolve(xhr.responseText);
                  } else {
                    reject(xhr.responseText); 
                  } 
                } 
            };
            xhr.open("POST",url);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            if(!data.values)
            {
                xhr.setRequestHeader("content-type","application/json");
               data=JSON.stringify(data);
            }
            xhr.setRequestHeader("Authorization","Bearer "+HTTPs.Token); 
            xhr.send(data);   
        });
    }
}


//toster Messages
var Tost={
    Tost:function(title,text,timeStop,position,color){
        $.toast({
            text : '<h4 style="color:#fff">'+title+'</h4>\n<p>'+text+'</p>',
            hideAfter : timeStop?timeStop:3000,
            showHideTransition : 'slide',
            position : position?position:'top-right',
            stack : 100, 
            allowToastClose : true,  
            bgColor : color
          })
    },
    info:function(title,text,timeStop,position){
        this.Tost(title,text,timeStop,position,'#23B65D');
    },
    error:function(title,text,timeStop,position){
        this.Tost(title,text,timeStop,position,'#E01A31');
    },
    warning:function(title,text,timeStop,position){
        this.Tost(title,text,timeStop,position,'#ff9966');
    },
    help:function(title,text,timeStop,position){
        this.Tost(title,text,timeStop,position,'#6523d9');
    }
}

//reload 

var Reloader={
    Start:function($nameDiv){
        $(document.querySelector($nameDiv)).append('<div class="card-disabled"><div class="card-portlets-loader"></div></div>');
    },
    Stop:function($nameDiv){
        $(document.querySelector($nameDiv)).find('.card-disabled').fadeOut('slow',function(){
            $(document.querySelector($nameDiv)).find('.card-disabled').remove();
        });
    }
}

//get current User



$ANContreoller.home={
    FUN:['$scope','$location','$cookies',function($scope,$location,$cookies){
        $scope.$emit('AuthChanged', true);
         
         var tabel= $('#scroll-vertical-datatable').DataTable({
            "scrollY":"300px",
            "min-height":"200px",
            "scrollCollapse": true,
            "pagingType": "full_numbers",
            "language": {
                "paginate": {
                    "previous": "<i class='mdi mdi-chevron-left'>",
                    "next": "<i class='mdi mdi-chevron-right'>"
                }
            },
            "drawCallback": function () {
                $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
            }
        });
    
        //load All Cases
        HTTPs.POST(CONFIG.serverUrl+"/GAPWI",{}).then(res=>{
            res=JSON.parse(res);
            res.forEach(row => {
                let date=new Date(row.createdAt);
                let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
                let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
                let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
                console.log(row);
                tabel.row.add([
                    `<a href="#" style="width:100%;text-align:center;display: block;">${row.id}</a>`,
                    `<min style="width:100%;text-align:center;display: block;">${da}-${mo}-${ye}  ${date.getHours()}:${date.getMinutes()}</min>`,
                    `<img src="${CONFIG.serverImageUrl+row.logo}">${row.nameDoctor}`,
                    `<img src="${CONFIG.serverImageUrl+row.image}">${row.firstName+' '+row.lastName}`,
                    `<a style="width:100%;text-align:center;display: block;" href="/Invoices/${$CRID.TO(row.id.toString())}">View Invoice </a>`,
                ]).draw(); 
            });
        });
    
        var getStatusCases=(status)=>{
            if(status==null)
            {
                return '<span class="Draft">Case Draft</span>';//Draft
            }
            else if(status==0){
                return '<span class="Draft">Case Draft</span>';//darft
            }
            else if(status==1){
                return '<span class="Processing">Records Processing</span>';//Records Processing
            }
            else if(status==2){
                return '<span class="TreatmentSetup">Treatment Setup</span>';//TreatmentSetup
            }
            else if(status==3){
                return '<span class="Revision">Case Revision</span>';//Case Revision
            }
            else if(status==4){
                return '<span class="Approval">Your Approval</span>';//Your Approval
            }
            else if(status==5){
                return '<span class="Fabrication">Case Fabrication</span>';//Case Fabrication
            }
            else if(status==6){
                return '<span class="Delivered">Case Delivered</span>';//Case Delivered
            }
            else if(status==7){
                return '<span class="Completed">Case Completed</span>';//Completed
            }
        }

        $scope.doctors=0;
        $scope.delivered=0;
        $scope.mediators=0;
        $scope.invoice=0;
        $scope.supervisors=0;
        $scope.treatmentplanners=0;
        $scope.getCountRecords=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/GCR",{}).then(res=>{
                res=JSON.parse(res);
                if(res.error==0)
                {
                    $scope.$apply(()=>{
                        $scope.doctors=res.data[0].doctors;
                        $scope.invoice=res.data[0].invoice;
                        $scope.patients=res.data[0].patients;
                        $scope.delivered=res.data[0].delivered;
                    });
                    var delay = $(this).attr('data-delay')?$(this).attr('data-delay'):100; //default is 100
                    var time = $(this).attr('data-time')?$(this).attr('data-time'):1200; //default is 1200
                     $('[data-plugin="counterup"]').each(function(idx, obj) {
                        $(this).counterUp({
                            delay: 100,
                            time: 1200
                        });
                     });
                }
            });
        }

        $scope.getCountRecords();
    }
],
Router:{
    Url:"/",
    Templete:'Views/home.html',
    Render:[
        {link:'assets/libs/datatables/dataTables.bootstrap4.css',type:"CSS"},
        {link:'assets/libs/datatables/responsive.bootstrap4.css',type:"CSS"},
        {link:'assets/libs/datatables/buttons.bootstrap4.css',type:"CSS"},
        {link:'assets/libs/datatables/select.bootstrap4.css',type:"CSS"},
        {link:'assets/libs/datatables/jquery.dataTables.min.js',type:"JS"},
        {link:'assets/libs/datatables/dataTables.bootstrap4.js',type:"JS"},
        {link:'assets/libs/datatables/dataTables.responsive.min.js',type:"JS"},
        {link:'assets/libs/datatables/dataTables.select.min.js',type:"JS"},
    ],
    AUTH:true
}
};

$ANContreoller.NotFondPage={
    FUN:['$scope','$location','$cookies',function($scope,$location,$cookies) {
        $scope.$emit('AuthChanged', true);
        var str = document.querySelector('.NotPeermstion1').innerHTML.toString();
        var i = 0;
        document.querySelector('.NotPeermstion1').innerHTML = "";

        setTimeout(function() {
            var se = setInterval(function() {
                i++;
                document.querySelector('.NotPeermstion1').innerHTML = str.slice(0, i) + "|";
                if (i == str.length) {
                    clearInterval(se);
                    document.querySelector('.NotPeermstion1').innerHTML = str;
                }
            }, 20);
        },0);
        
    }],
    Router:{
        Url:"/NotFondPage",
        Templete:'NotFondPage.html',
        Render:[],
        AUTH:true
    }
}

$ANContreoller.Cases={
    FUN:['$scope','$location','$routeParams',function($scope,$location,$routeParams) {
        Reloader.Start('#cases');
        $scope.Status=-1;
        $scope.Submited=false;
        $scope.$emit('AuthChanged', true);
        $scope.idPatient=-1;
        $scope.DeleteCases=false;
        if($routeParams.id !="_")
        {
            let testId=$CRID.END($routeParams.id);
            if(testId)
            {
                $scope.idPatient=testId
            }
            else{
                $location.path('/NotFondPage');
                return;
            }
        }
    
        if($scope.idPatient!=-1)
        {
            HTTPs.POST(CONFIG.serverUrl+"/P/GetStatus",{id:$scope.idPatient}).then(res=>{
                res=JSON.parse(res);
                if(res.message==2000)
                {
                    if(res.data.length > 0)
                    {
                        $scope.$apply(()=>{
                            $scope.Status=res.data[0].caseStatus;
                            if((res.data[0].caseStatus==0 || !res.data[0].caseStatus ) && $location.search().D=="T")
                            {
                                $scope.DeleteCases=true;
                                return;
                            }
                            if(res.data[0].caseStatus >=4)
                            {
                                $scope.TAB.tretmentPlan.display=true;
                            }
                        })
                    }
                    else{
                        $location.path('/NotFondPage');
                    }
                
                }
            });
        }
    
        $scope.TAB={
            patientInformation:{display:true,set:true,active:true},
            patientRecords:{display:true,set:false,active:false},
            createOrder:{display:true,set:false,active:false},
            submitCase:{display:true,set:false,active:false},
            AdditionalInstructions:{display:true,set:false,active:false},
            tretmentPlan:{display:false,set:false,active:false},
        };
    
    
        //vairable Static
        var ImageELement={};
        $scope.hideNavbar=false;
        $scope.hideNav=()=>{
            $scope.hideNavbar=true;
        }
        $scope.nextTab=(id,submited=false,nav=false)=>{
            if(nav & ($scope.Status==-1 || $scope.Status==null))
            {
                return;
            }
            Object.keys($scope.TAB).forEach(key=>{
                if(id=='submitCase' && $scope.Status >= 1)
                {
                    id='AdditionalInstructions';
                }
                if(key == id)
                {
                    $scope.TAB[key].set=true;
                    $scope.TAB[key].active=true;
                    if(submited)
                    {
                        $scope.Submited=true;
                        $scope.hideNavbar=false;
                        $scope.Status=1;
                    }
                }
                else{
                    $scope.TAB[key].set=false;
                    $scope.TAB[key].active=false;
                }
                
            })
    
        }
        if(!$location.search().TB && !$location.search().D!="T")
        {
            $location.search().TB="patientInformation";
        }
        
         $scope.nextTab($location.search().TB);
         Reloader.Stop('#cases');
    
    
        //Shippings information
        $scope.Country="214";
        $scope.CountryItem=[];
        $scope.getCountrys=()=>{
            $.get("/assets/data/countrys.json", function( data ) {
               $scope.$apply(()=>{
                   $scope.CountryItem=data;
                   
               });
            });
        }
        $scope.CitysItemFull=[];
        $scope.CitysItem=[];
        $scope.City="3555";
        $scope.getCitys=()=>{
            $.get( "/assets/data/citys.json", function( data ) {
               $scope.$apply(()=>{
                   $scope.CitysItemFull=data;
                   $scope.CitysItem=$scope.CitysItemFull.filter(x=>x.countryId==$scope.Country);
               });
            });
        }
        $scope.getCountrys();
        $scope.getCitys();
        $scope.changeCountry=(id=null)=>{
            $scope.CitysItem=$scope.CitysItemFull.filter(x=>x.countryId==$scope.Country);
            if(id)
            {
                $scope.City=id;
            }
            else{
                $scope.City=$scope.CitysItem[0].id;
            }
        }
        $scope.TitleFormSh="";
        $scope.showModelShippingCreate=()=>{
          $scope.idAdressSh=-1;
          $scope.TitleFormSh='Add a New Address';
          $('#modelShippingForm input').val('');
          $('#modelShippingForm input').removeClass('sucssInput');
          $('#modelShippingForm select').removeClass('sucssInput');
          $('#modelShippingForm').modal('show');
         }
         $scope.LoaderFormSh=false;
         $scope.idAdress=-1;
    
         $scope.ShippingCreateUpdate=()=>{
          var valueForm=Validate(document.getElementById('modelShippingForm'));
          if(!valueForm)
          {
              return false;
          }
          valueForm['id']= $scope.idAdress;
          $scope.LoaderForm=true;
          HTTPs.POST(CONFIG.serverUrl+"/SHCAU",valueForm).then(res=>{
              res=JSON.parse(res);
              if(res.message==2000)
              {
                  $('#modelShippingForm').modal('hide');
                  $scope.$apply(()=>{
                    $scope.$emit('updateShippings',null);
                  });
              }
              $scope.LoaderForm=false;
          });
      }
      
       
    }],
    Router:{
        Url:"/Cases/:id",
        Templete:'Views/Cases/Cases.html',
        Render:[
            {link:'//vjs.zencdn.net/7.10.2/video-js.min.css',type:"CSS"},
            {link:'assets/libs/animate/animate.min.css',type:"CSS"},
            {link:'assets/libs/flatpickr/flatpickr.min.css',type:"CSS"},
            {link:'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js',type:"JS"},
            {link:'assets/libs/flatpickr/flatpickr.min.js',type:"JS"},
            {link:'assets/libs/tippy-js/tippy.all.min.js',type:"JS"},
            {link:'//vjs.zencdn.net/7.10.2/video.min.js',type:"JS"},
        // {link:'assets/libs/jsPdf/jspdf.umd.min.js',type:"JS"},
        ],
        AUTH:true
    }
}

$ANContreoller.Auth_Confirm={
    FUN:['$scope','$location','$cookies',function($scope,$cookies){
        $scope.$emit('AuthChanged', false);
    
        //country and City
        $scope.CountryId="219";
        $scope.TitleForm="";
        $scope.CountryItem=[];
        $scope.getCountrys=()=>{
            $.get("/assets/data/countrys.json", function( data ) {
                $scope.$apply(()=>{
                    $scope.CountryItem=data;
                });
            });
        }
        $scope.CitysItemFull=[];
        $scope.CitysItem=[];
        $scope.City="";
        $scope.getCitys=()=>{
            $.get( "/assets/data/citys.json", function( data ) {
                $scope.$apply(()=>{
                    $scope.CitysItemFull=data;
                    $scope.CitysItem=$scope.CitysItemFull.filter(x=>x.countryId==$scope.CountryId);
                });
            });
        }
        $scope.getCountrys();
        $scope.getCitys();
        $scope.changeCountry=(id=null)=>{
            $scope.CitysItem=$scope.CitysItemFull.filter(x=>x.countryId==$scope.CountryId);
            if(id)
            {
                $scope.City=id;
            }
            else{
                $scope.City=$scope.CitysItem[0].id;
            }
        }
    
    
        $scope.confirmStatus="1";
        $scope.init=()=>{
                 var l = Ladda.create(document.querySelector('.ladda-button'));
                $scope.loader=true;
    
                document.getElementById('countryId').addEventListener("change",(re)=>{
                    $scope.$apply(()=>{
                        $scope.CountryId=re.target.value.toString();
                        $scope.changeCountry();
                    });
                });
                $scope.ErrorMessagss=" ";
                $scope.fullName="";
                $scope.ConfirmAccount=()=>{
                    var valueForm=Validate(document.getElementById('formLogin'));
                    if(!valueForm)
                    {
                        return false;
                    }
                    if(!iti.isValidNumber())
                    {
                        $('.ErrorMessagePhone').html($('.ErrorMessagePhone').attr('titleError'));
                        $('#phone').addClass("errorInput");
                        $('#phone').removeClass("sucssInput");
                        return;
                    }
                    else{
                        $('#phone').removeClass("errorInput");
                        $('#phone').addClass("sucssInput");
                        $('.ErrorMessagePhone').html("");
                        valueForm['phoneNumber']=iti.getNumber();
                    }
                    l.start();
                    HTTPs.Token=$scope.PUA.token;
                    HTTPs.POST(CONFIG.serverUrl+"/DCA",valueForm).then(res=>{
                        res=JSON.parse(res);
                        console.log(res);
                        if(res.message=="confirm Sucess")
                        {
                            $scope.$apply(()=>{
                                $scope.confirmStatus=0;
                                $cookies.put('PUA', JSON.stringify({token:$scope.PUA.token,Did:res.user.dentalCenterId,name:res.user.nameDoctor,image:res.user.logo,phone:res.user.phoneNumber,email:res.user.email}));
                                l.stop();
                            });
                        }
                    });
    
                }
                if($cookies.get("PUA"))
                {
                    $scope.PUD=JSON.parse($cookies.get("PUA"));
                }
    
                var input = document.querySelector("#phone");
                var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
    
                // initialise plugin
                
                var iti = window.intlTelInput(input, {
                    initialCountry: "auto",
                    geoIpLookup: function(callback) { 
    
                    $.get('https://ipinfo.io/json?token=185e80a0d228c6', function() {}, "json").always(function(resp) {
                        var countryCode = (resp && resp.country) ? resp.country : "us";
                        callback(countryCode);
                    });
                    },
                    nationalMode: true,
                    formatOnDisplay: true,
                    separateDialCode: true,
                    autoFormat:true,
                    utilsScript: "/assets/libs/tellPhone/utils.js?1638200991544"
                });
    
                $scope.logout=()=>{
                    $cookies.remove("PUD");
                    location.reload();
                }
                var reset = function() {
                    input.classList.add('errorInput');
                };
                
                // on blur: validate
                input.addEventListener('blur', function(e) {
                    reset();
                    if (input.value.trim()) {
                        if (iti.isValidNumber()) {
                            input.classList.add("sucssInput");
                            input.classList.remove("errorInput");
                        } else {
                            input.classList.remove("sucssInput");
                            input.classList.add("errorInput");
                        }
                    }
                });
    
                // on keyup / change flag: reset
                input.addEventListener('change', reset);
                input.addEventListener('keyup', reset);
                input.addEventListener("keydown", (e)=>{
                    placHolder(e);
                });
                $('.iti__selected-flag').click(res=>{
                    $(input).mask("000000000000000000000");
                });
                input.addEventListener("countrychange", function(e) {
                    e.target.value="";
                    $scope.$apply(()=>{
                        let idCountry=$scope.CountryItem.find(x=>x.code==iti.getSelectedCountryData().iso2);
                        $scope.CountryId=idCountry.id;
                        $scope.changeCountry();
                    });
                    placHolder(e,true);
                });
                var placHolder=(e,maskEvev=null)=>{
                    let plac= e.target.getAttribute("placeholder");
                    let stringTemp="";
                    let mask="";
                    for(var i=0;i<plac.length;i++)
                    {
                        if(plac[i] !='-' && plac[i] != "(" && plac[i]!= ")" && plac[i] != " ")
                        {
                            stringTemp+="x";
                            mask+="0";
                        }
                        else{
                            stringTemp+=plac[i];
                            mask+=plac[i];
                        }
                    }
                    e.target.setAttribute('placeholder',stringTemp);
                    if(maskEvev)
                    {
                        $(input).mask(mask);
                    }
                }
     
        }
    }],
    Router:{
        Url:"/Auth/Confirm",
        Templete:'Views/Auth/Confirm.html',
        Render:[
            {link:'assets/libs/animate/animate.min.css',type:"CSS"},
            {link:'assets/libs/ladda/ladda-themeless.min.css',type:"CSS"},
            {link:'assets/libs/tellPhone/intlTelInput.min.css',type:"CSS"},
            {link:'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',type:"JS"},
            {link:'https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js',type:"JS"},
            {link:'assets/libs/tellPhone/intlTelInput.min.js',type:"JS"},
            {link:'assets/libs/jquery-mask-plugin/jquery.mask.min.js',type:"JS"},
            {link:'assets/libs/autonumeric/autoNumeric-min.js',type:"JS"},
            {link:'assets/libs/ladda/spin.js',type:"JS"},
            {link:'assets/libs/ladda/ladda.js',type:"JS"},
            {link:'assets/libs/parsleyjs/parsley.min.js',type:"JS"},
        ],
        AUTH:true
    }
}
$ANContreoller.Auth_Login={
    FUN:['$scope','$cookies','$location',function($scope,$cookies,$location){
        $scope.$emit('AuthChanged', false);
        // $cookies.put('testCok', 'oatmeal');
       //  console.log($cookies.remove('PUA'));
        if($cookies.get('PUA'))
        {
           // $location.path('/');
        }
        var l = Ladda.create(document.querySelector('.ladda-button'));
        var m = Ladda.create(document.querySelector('#loginGoogel'));
        $scope.loader=true;
        $scope.ErrorMessagss=" ";
        $scope.Login=()=>{
            var valueForm=Validate(document.getElementById('formLogin'));
            if(!valueForm)
            {
                return false;
            }
            valueForm['kiven']="asdas";
            m.start();
            l.start();
            HTTPs.POST(CONFIG.serverUrl+"/Login",valueForm).then(res=>{
                res=JSON.parse(res);
                if(res.message=="Auth successful")
                {
                    Login(res);
                }
                else if(res.message=="error Login"){
                    //not fond account
                    $scope.$apply(()=>{
                        $scope.ErrorMessagss="You do not have an account Do you want to <a href='/Auth/Log'>register</a> a new account";
                        $('#email').css('border','1px dashed red');
                        $('#email').focus();
                        $('#password').css('border','1px solid #f1f1f5'); 
                        l.remove(); 
                        m.remove(); 
                    })
                }
                else if(res.message=="Error Password"){
                    $scope.$apply(()=>{
                        $scope.ErrorMessagss="You may have entered the wrong password, retype the password again";  
                        $('#email').css('border','1px dashed green');  
                        $('#password').css('border','1px dashed red');  
                        $('#email').focus();    
                        l.remove(); 
                        m.remove(); 
                    });
                    
                }
            });
    
        }
    
        if(!firebaseApp1)
        {
          provider = new firebase.auth.GoogleAuthProvider();
          const firebaseConfig = {
              apiKey: "AIzaSyBocHvWEfdQ8A78A9xyPVpe5tWCzkIkOgo",
              authDomain: "parisaline-4733c.firebaseapp.com",
              projectId: "parisaline-4733c",
              storageBucket: "parisaline-4733c.appspot.com",
              messagingSenderId: "860262996325",
              appId: "1:860262996325:web:2e39abb3b9f8a6f099698c",
              measurementId: "G-39ZF95XN8T"
          };
          firebaseApp1=firebase.initializeApp(firebaseConfig);
        }
        document.getElementById('loginGoogel').addEventListener('click', ()=>{
            m.start();
            l.start();
            firebaseApp1.auth().signInWithPopup(provider).then(res=>{
                HTTPs.POST(CONFIG.serverUrl+"/CLG",{an:res.credential.accessToken}).then(res=>{
                     res=JSON.parse(res);
                     if(res.message=="Auth successful"){
                         Login(res);
                     }
                     else if(res.message=="Auth Exsist")
                     {
                        Login(res);
                     }
                });
              }).catch(e=>{
                    m.remove(); 
                    l.remove();
              });
        });
        let Login=(res)=>{
            if(res.tempPass)
            {
                $cookies.put("PS",JSON.stringify({token:res.token}));
                location.reload();
            }
            else{
                CONFIG.Did=res.user.dentalCenterId;
                $cookies.put('PUA', JSON.stringify({token:res.token,Did:res.user.dentalCenterId,name:res.user.nameDoctor,image:res.user.logo,phone:res.user.phoneNumber,email:res.user.email})); //PUA Parisaline User ACCountant
                $scope.$apply(()=>{
                    $scope.ErrorMessagss="Authentication completed successfully, you will be redirected to the control panel";
                    setTimeout(() => {
                        $('#email').css('border','1px dashed green'); 
                        $('#password').css('border','1px dashed green'); 
                        location.reload();
                        m.remove(); 
                        l.remove();
                    }, 1000);
                });
                $('#ErrorMessagePublic').css('background','#0baf2921');
            }
        }
    }],
    Router:{
        Url:'/Auth/Login',
        Templete:'Views/Auth/Login.html',
        Render:[
            {link:'assets/libs/ladda/ladda-themeless.min.css',type:"CSS"},
            {link:'assets/libs/ladda/spin.js',type:"JS"},
            {link:'assets/libs/ladda/ladda.js',type:"JS"},
            {link:'assets/libs/parsleyjs/parsley.min.js',type:"JS"},
        ],
        AUTH:false
    }
}



$ANContreoller.Auth_Signup={
    FUN:['$scope','$cookies',function($scope,$cookies){
        $scope.$emit('AuthChanged', false);
        var l = Ladda.create(document.querySelector('.ladda-button'));
        $scope.loader=true;
        $scope.clickButton=false;
        $scope.termsAndConditions=false;
        $scope.iCertifyThat=false;
        $scope.clickButton=false;
        $scope.ErrorMessagss=' ';
        $scope.CreateAccount=()=>{
            $scope.clickButton=true;
            var valueForm=Validate(document.getElementById('formLogin'));
            if(!valueForm)
            {
                return false;
            }
            if(valueForm['password']!=valueForm['ConfirmPassword'])
            {
                $('#ConfirmPassword').addClass("errorInput");
                $('#ConfirmPassword').removeClass("sucssInput");
                var pp=document.querySelector('#ConfirmPassword').parentNode.querySelector("a");
                pp.innerHTML=pp.getAttribute("titleError");
                return ;
            }
            else{
                $('#ConfirmPassword').addClass("sucssInput");
                $('#ConfirmPassword').removeClass("errorInput");
                var pp=document.querySelector('#ConfirmPassword').parentNode.querySelector("a");
                pp.innerHTML="";
            }
            if(!iti.isValidNumber())
            {
                $('.ErrorMessagePhone').html($('.ErrorMessagePhone').attr('titleError'));
                return;
            }
            else{
                $('.ErrorMessagePhone').html("");
                valueForm['phoneNumber']=iti.getNumber();
            }
            if(!$scope.termsAndConditions || !$scope.iCertifyThat)
            {
                return ;
            }
            l.start();
            HTTPs.POST(CONFIG.serverUrl+"/DC",valueForm).then(res=>{
                res=JSON.parse(res);
                if(res.error==1001)
                {
                    $scope.ErrorMessagss=`
                    <p>The email you entered already exists </p>
                    <p>Please try to login with your existing account</p>
                    `;
                }
                else{
                    if(res.message=="Auth successful")
                    {
                        Login(res);
                    }
                }
    
                l.stop();
            });
    
        }
    
        let Login=(res)=>{
            CONFIG.Did=res.user.dentalCenterId;
            $cookies.put('PUA', JSON.stringify({token:res.token,Did:res.user.dentalCenterId,name:res.user.nameDoctor,image:res.user.logo,phone:res.user.phoneNumber})); //PUA Parisaline User Doctor
            $scope.$apply(()=>{
                $scope.ErrorMessagss="Authentication completed successfully, you will be redirected to the control panel";
                setTimeout(() => {
                    $('#email').css('border','1px dashed green'); 
                    $('#password').css('border','1px dashed green'); 
                    location.reload();
                    m.remove(); 
                    l.remove();
                }, 1000);
            });
            $('#ErrorMessagePublic').css('background','#0baf2921');
        }
    
        var input = document.querySelector("#phone");
        var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
    
        // initialise plugin
        var iti = window.intlTelInput(input, {
            initialCountry: "auto",
            geoIpLookup: function(callback) { 
    
              $.get('https://ipinfo.io/json?token=185e80a0d228c6', function() {}, "json").always(function(resp) {
                var countryCode = (resp && resp.country) ? resp.country : "us";
                callback(countryCode);
              });
            },
            nationalMode: true,
            formatOnDisplay: true,
            separateDialCode: true,
            autoFormat:true,
            utilsScript: "/assets/libs/tellPhone/utils.js?1638200991544"
        });
    
        
        var reset = function() {
            input.classList.add('errorInput');
        };
        
        // on blur: validate
        input.addEventListener('blur', function(e) {
            reset();
            if (input.value.trim()) {
                if (iti.isValidNumber()) {
                    input.classList.add("sucssInput");
                    input.classList.remove("errorInput");
                } else {
                    input.classList.remove("sucssInput");
                    input.classList.add("errorInput");
                }
            }
        });
    
        // on keyup / change flag: reset
        input.addEventListener('change', reset);
        input.addEventListener('keyup', reset);
        input.addEventListener("keydown", (e)=>{
            placHolder(e);
        });
        $('.iti__selected-flag').click(res=>{
            $(input).mask("000000000000000000000");
        });
        input.addEventListener("countrychange", function(e) {
            e.target.value="";
            $scope.$apply(()=>{
               let idCountry=$scope.CountryItem.find(x=>x.code==iti.getSelectedCountryData().iso2);
               $scope.Country=idCountry.id;
               $scope.changeCountry();
            });
            placHolder(e,true);
          });
          var placHolder=(e,maskEvev=null)=>{
            let plac= e.target.getAttribute("placeholder");
            let stringTemp="";
            let mask="";
            for(var i=0;i<plac.length;i++)
            {
                if(plac[i] !='-' && plac[i] != "(" && plac[i]!= ")" && plac[i] != " ")
                {
                     stringTemp+="x";
                     mask+="0";
                }
                else{
                     stringTemp+=plac[i];
                     mask+=plac[i];
                }
            }
            e.target.setAttribute('placeholder',stringTemp);
            if(maskEvev)
            {
                $(input).mask(mask);
            }
          }
    
    
          //country and City
          $scope.Country="219";
          $scope.TitleForm="";
          $scope.CountryItem=[];
          $scope.getCountrys=()=>{
              $.get("/assets/data/countrys.json", function( data ) {
                 $scope.$apply(()=>{
                     $scope.CountryItem=data;
                 });
              });
          }
          $scope.CitysItemFull=[];
          $scope.CitysItem=[];
          $scope.City="";
          $scope.getCitys=()=>{
              $.get( "/assets/data/citys.json", function( data ) {
                 $scope.$apply(()=>{
                     $scope.CitysItemFull=data;
                     $scope.CitysItem=$scope.CitysItemFull.filter(x=>x.countryId==$scope.Country);
                 });
              });
          }
          $scope.getCountrys();
          $scope.getCitys();
          $scope.changeCountry=(id=null)=>{
              $scope.CitysItem=$scope.CitysItemFull.filter(x=>x.countryId==$scope.Country);
              if(id)
              {
                  $scope.City=id;
              }
              else{
                  $scope.City=$scope.CitysItem[0].id;
              }
          }
    
          var l = Ladda.create(document.querySelector('.ladda-button'));
          var m = Ladda.create(document.querySelector('#loginGoogel'));
          $scope.loader=true;
          $scope.ErrorMessagss=" ";
    
          if(!firebaseApp1)
          {
            provider = new firebase.auth.GoogleAuthProvider();
            const firebaseConfig = {
                apiKey: "AIzaSyBocHvWEfdQ8A78A9xyPVpe5tWCzkIkOgo",
                authDomain: "parisaline-4733c.firebaseapp.com",
                projectId: "parisaline-4733c",
                storageBucket: "parisaline-4733c.appspot.com",
                messagingSenderId: "860262996325",
                appId: "1:860262996325:web:2e39abb3b9f8a6f099698c",
                measurementId: "G-39ZF95XN8T"
            };
            firebaseApp1=firebase.initializeApp(firebaseConfig);
          }
        document.getElementById('loginGoogel').addEventListener('click', ()=>{
            $scope.$apply(()=>{
                $scope.clickButton=true;
            });
            if(!$scope.termsAndConditions && !$scope.iCertifyThat)
            {
                return ;
            }
            m.start();
            l.start();
            firebaseApp1.auth().signInWithPopup(provider).then(res=>{
                HTTPs.POST(CONFIG.serverUrl+"/CLG",{an:res.credential.accessToken}).then(res=>{
                     res=JSON.parse(res);
                     if(res.message=="Auth successful"){
                        regestry(res);
                     }
                     else if(res.message=="Auth Exsist")
                     {
                        regestry(res);
                     }
                });
              }).catch(e=>{
                    m.remove(); 
                    l.remove();
              });
        });
        let regestry=(res)=>{
            if(res.tempPass)
            {
                $cookies.put("PS",JSON.stringify({token:res.token}));
                location.reload();
            }
            else{
                CONFIG.Did=res.user.dentalCenterId;
                $cookies.put('PUA', JSON.stringify({token:res.token,Did:res.user.dentalCenterId,name:res.user.nameDoctor,image:res.user.logo,phone:res.user.phoneNumber,email:res.user.email})); //PUA Parisaline User Doctor
                $scope.$apply(()=>{
                    $scope.ErrorMessagss="Authentication completed successfully, you will be redirected to the control panel";
                    setTimeout(() => {
                        $('#email').css('border','1px dashed green'); 
                        $('#password').css('border','1px dashed green'); 
                        location.reload();
                        m.remove(); 
                        l.remove();
                    }, 1000);
                });
                $('#ErrorMessagePublic').css('background','#0baf2921');
            }
        }
    
    
    }],
    Router:{
        Url:"/Auth/Signup",
        Templete:'Views/Auth/Signup.html',
        Render:[
            {link:'assets/libs/ladda/ladda-themeless.min.css',type:"CSS"},
            {link:'assets/libs/tellPhone/intlTelInput.min.css',type:"CSS"},
            {link:'assets/libs/tellPhone/intlTelInput.min.js',type:"JS"},
            {link:'assets/libs/jquery-mask-plugin/jquery.mask.min.js',type:"JS"},
            {link:'assets/libs/autonumeric/autoNumeric-min.js',type:"JS"},
            {link:'assets/libs/ladda/spin.js',type:"JS"},
            {link:'assets/libs/ladda/ladda.js',type:"JS"},
            {link:'assets/libs/parsleyjs/parsley.min.js',type:"JS"},
        ],
        AUTH:false
    }
}
var CONT_Auth_newPassword=function($scope,$cookies,$location){
    $scope.$emit('AuthChanged', false);
    // $cookies.put('testCok', 'oatmeal');
   //  console.log($cookies.remove('PUA'));
    if($cookies.get('PUA'))
    {
       // $location.path('/');
    }
    $scope.submited=0;
    $scope.errorPasswrd=0;
    $scope.init=()=>{
        var l = Ladda.create(document.querySelector('.ladda-button'));
        $scope.loader=true;
        $scope.ErrorMessagss=" ";
        $scope.recoveryPassword=()=>{
            var valueForm=Validate(document.getElementById('formLogin'));
            if(!valueForm)
            {
                return false;
            }
            if(valueForm['password']!=valueForm['confirmPassowrd'])
            {
                $scope.errorPasswrd=1;
                $('#confirmPassowrd').addClass("errorInput");
                $('#password').removeClass("errorInput");
                return;
            }
            if(valueForm['password']=="")
            {
                $scope.errorPasswrd=2;
                $('#password').addClass("errorInput");
                $('#confirmPassowrd').addClass("errorInput");
                return;
            }
            l.start();
            if($cookies.get("PS"))
            {
                HTTPs.Token=JSON.parse($cookies.get("PS")).token;
            }
            HTTPs.POST(CONFIG.serverUrl+"/RUP",valueForm).then(res=>{
                res=JSON.parse(res);
                if(res.message=="Auth successful")
                {
                   $cookies.remove("PS");
                   Login(res);
                }
            });
    
            let Login=(res)=>{
                if(res.tempPass)
                {
                    $cookies.put("PS",JSON.stringify({token:res.token}));
                    location.reload();
                }
                else{
                    CONFIG.Did=res.user.dentalCenterId;
                    $cookies.put('PUA', JSON.stringify({token:res.token,Did:res.user.dentalCenterId,name:res.user.nameDoctor,image:res.user.logo,phone:res.user.phoneNumber,email:res.user.email})); //PUA Parisaline User Doctor
                    $scope.$apply(()=>{
                        $scope.ErrorMessagss="Authentication completed successfully, you will be redirected to the control panel";
                        setTimeout(() => {
                            $('#email').css('border','1px dashed green'); 
                            $('#password').css('border','1px dashed green'); 
                            location.reload();
                            l.remove();
                        }, 1000);
                    });
                    $('#ErrorMessagePublic').css('background','#0baf2921');
                }
            }
        }
    
    }
   
}


$ANContreoller.Auth_newPassword={
    FUN:['$scope','$location','$cookies',function($scope,$location,$cookies) {
        $scope.$emit('AuthChanged', true);
    }],
    Router:{
        Url:"/Auth/RP",
        Templete:'Views/Auth/newPassword.html',
        Render:[
            {link:'assets/libs/ladda/ladda-themeless.min.css',type:"CSS"},
            {link:'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',type:"JS"},
            {link:'https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js',type:"JS"},
            {link:'assets/libs/ladda/spin.js',type:"JS"},
            {link:'assets/libs/ladda/ladda.js',type:"JS"},
            {link:'assets/libs/parsleyjs/parsley.min.js',type:"JS"},
        ],
        AUTH:false
    }
}

$ANContreoller.Auth_revoverPassword={
    FUN:['$scope','$cookies','$location',
    function($scope,$cookies,$location){
        $scope.$emit('AuthChanged', false);
        // $cookies.put('testCok', 'oatmeal');
       //  console.log($cookies.remove('PUA'));
        if($cookies.get('PUA'))
        {
           // $location.path('/');
        }
        $scope.submited=0;
        $scope.errorEmail=0;
        $scope.init=()=>{
            var l = Ladda.create(document.querySelector('.ladda-button'));
            $scope.loader=true;
            $scope.ErrorMessagss=" ";
            $scope.RecoveryEmail=()=>{
                var valueForm=Validate(document.getElementById('formLogin'));
                if(!valueForm)
                {
                    return false;
                }
                l.start();
                HTTPs.POST(CONFIG.serverUrl+"/RPA",valueForm).then(res=>{
                    res=JSON.parse(res);
                    if(res.message==2001)
                    {
                        $scope.$apply(()=>{
                            $scope.submited=1;
                        })
                    }
                    else if(res.error==1001)
                    {
                        $scope.$apply(()=>{
                            $scope.errorEmail=1;
                        })
                        $('#email').addClass("errorInput");
                        $('#email').removeClass("sucssInput");
                    }
        
                });
        
            }
        
        }
       
    }
    ],
    Router:{
        Url:"/Auth/Rec",
        Templete:'Views/Auth/revoverPassword.html',
        Render:[
            {link:'assets/libs/ladda/ladda-themeless.min.css',type:"CSS"},
            {link:'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',type:"JS"},
            {link:'https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js',type:"JS"},
            {link:'assets/libs/ladda/spin.js',type:"JS"},
            {link:'assets/libs/ladda/ladda.js',type:"JS"},
            {link:'assets/libs/parsleyjs/parsley.min.js',type:"JS"},
        ],
        AUTH:false
    }
}
var RUNAUTOTSTARTAPP=function(event, current, previous, rejection,$location){
    if(rejection === 'Not Authenticated'){
        $location.path('/Auth/Login');
    }
    else if(rejection==="Not Login")
    {
        $location.path('/');
    }
    else if(rejection==="Not Confirm")
    {
        $location.path('/Auth/Confirm');
    }
    else if(rejection==="rePassword")
    {
        $location.path('/Auth/RP');
    }
}
    
var FACT_Render=function(linkArray,auth,$q,$cookies,$location){
    var deferred = $q.defer();
    var isAuthenticated=$cookies.get('PUA')?JSON.parse($cookies.get('PUA')):false;
    
    var num=0;
    var add=()=>{
        if(linkArray.length!=0)
        {
            if(linkArray[num].type=="CSS")
            {
                if(!Styles.find(x=>x==linkArray[num].link))
                {
                  var newSS=document.createElement('link');
                  newSS.rel='stylesheet';
                  newSS.href=linkArray[num].link;
                  newSS.onload=()=>{
                    num++;
                    if(num<=linkArray.length-1)
                    {
                         add();
                    }
                    else{
                        onLoad(true);
                    }
                  }
                  document.getElementsByTagName("head")[0].appendChild(newSS);
                  Styles.push(linkArray[num].link);
                }
                else{
                    num++;
                    if(num<=linkArray.length-1)
                    {
                         add();
                    }
                    else{
                        onLoad(true);
                    }
                }
            }
            else if(linkArray[num].type=="JS"){
                if(!Scripts.find(x=>x==linkArray[num].link))
                {
                    Scripts.push(linkArray[num].link);
                    let script=document.createElement('script');
                    script.src=linkArray[num].link;
                    if(linkArray[num].typeScript)
                    {
                        script.type="module";
                    }
                    script.onload = ()=> {
                        num++;
                       if(num<=linkArray.length-1)
                       {
                            add();
                       }
                       else{
                           onLoad(true);
                       }
                    };
                    script.onerror=()=>{
                        num++;
                       if(num<=linkArray.length-1)
                       {
                           add();
                       }
                       else{
                           onLoad(true);
                       }
                    }
                    document.getElementsByTagName("body")[0].appendChild(script);
                }
                else{
                    num++;
                    if(num<=linkArray.length-1)
                    {
                        add();
                    }
                    else{
                        onLoad(true);
                    }
                }
            }

        }
        else{
            onLoad(true);
        }
    }

    var onLoad=(e)=>{
        if(auth)
        {
            if(isAuthenticated)
            {
                HTTPs.Token=isAuthenticated.token;
                CONFIG.Did=isAuthenticated.dentalCenterId;
                HTTPs.POST(CONFIG.serverUrl+"/TT",{}).then(res=>{
                    res=JSON.parse(res);
                    if(res.message==true)
                    {
                        if(isAuthenticated.phone)
                        {
                            if(($location.$$path=="/Auth/Confirm" || $location.$$path=="/Auth/Confirm"))
                            {
                                deferred.reject('Not Login');
                            }
                            else{
                                deferred.resolve(true);
                            }
                        }
                        else{
                            if(($location.$$path=="/Auth/Confirm" || $location.$$path=="/Auth/Confirm"))
                            {
                                deferred.resolve(true);
                            }
                            else{
                                deferred.reject('Not Confirm');
                            }
                        }
                        
                    }
                    else{
                        deferred.reject('Not Authenticated');
                        $cookies.remove("PUA");
                    }
                })
            }
            else{
                deferred.reject('Not Authenticated');
                $cookies.remove("PUA");
            }
        }
        else{
            if(isAuthenticated && ($location.$$path=="/Auth/Login" || $location.$$path=="/Auth/Signup" ||$location.$$path=="/Auth/RP"))
            {
                deferred.reject('Not Login');
            }
            else{
                if($cookies.get('PS'))
                {
                    if($location.$$path=="/Auth/RP")
                    {
                        deferred.resolve(true);
                    }
                    else{
                        deferred.reject('rePassword');
                    }
                    
                    
                }
                else{
                    deferred.resolve(true);
                }
            }

        }
    }
    add();
    return deferred.promise;
}


$ANFilter.nl2p={FUN:function () {
    return function(text){
        text = String(text).trim();
        return (text.length > 0 ? '<p>' + text.replace(/[\r\n]+/g, '</p><p>') + '</p>' : null);
    }
}}

$ANFilter.time={FUN:function () {
    return function(date){
        date=new Date(date);
        return date.getHours()+':'+date.getMinutes();
    }
}}


$ANFilter.imageUser={
    FUN:function () {
        return function(image){
            if(image)
            {
                let img="";
                if(image.split('googleusercontent').length == 1)
                {
                    img=CONFIG.serverImageUrl+image;
                }
                else{
                    img=image;
                }
                return img;
            }
            else{
                return "";
            }
        }
    }
    
}


$ANContreoller.Patients={
    FUN:['$scope','$location','$cookies',function($scope,$location,$cookies) {
        $scope.$emit('AuthChanged', true);
        var render=[];
        var actionRows=false;
        var tabel= $('#scroll-vertical-datatable').DataTable({
            "scrollY":"300px",
            "min-height":"200px",
            "scrollCollapse": true,
            "pagingType": "full_numbers",
            "language": {
                "paginate": {
                    "previous": "<i class='mdi mdi-chevron-left'>",
                    "next": "<i class='mdi mdi-chevron-right'>"
                }
            },
            "drawCallback":function(){
                $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
                if(actionRows)
                {
                    if(render.find(x=>x===this.api().rows( {page:'current'} ).page()) ==undefined)
                    {
                        $('.btnViewAddress').click(function(e){
                            let Process=[{end:Date().length,Start:Date()}];
                            
                            $scope.$apply(()=>{
                                $scope.openModelTask($(this).attr('data-id'));
                            });

                        });
                        render.push(this.api().rows( {page:'current'} ).page());
                    }
                }
                
            }
        });
    
        //load All Cases
        HTTPs.POST(CONFIG.serverUrl+"/GAP",{}).then(res=>{
            res=JSON.parse(res);
            for (let i = 0; i < res.length; i++) {
                if(i==res.length-1)
                {
                    actionRows=true;
                }
                tabel.row.add([
                    `<a style="width:100%;text-align:left;display: block;">${res[i].patientId}</a>`,
                    `<a style="width:100%;text-align:left;display: block;"><img src="${CONFIG.serverImageUrl+res[i].logo}">${res[i].nameDoctor}</a>`,
                    `<a style="width:100%;text-align:left;display: block;"><img src="${CONFIG.serverImageUrl+res[i].image}">${res[i].firstName}</a>`,
                    `<a style="width:100%;text-align:left;display: block;">${res[i].gender==2?'Fmale':'Male'}</a>`,
                    `<min style="width:100%;text-align:center;display: block;"><a class="btn btn-outline-info btnViewAddress" data-id="${res[i].patientId}"><strong>${res[i].NumberOfOperations}</strong> <i class="fa fa-eye"></i></a></min>`,
                ]).draw();
            }
        });
    
        var getStatusCases=(status)=>{
            if(status==null)
            {
                return '<span class="Draft">Case Draft</span>';//Draft
            }
            else if(status==0){
                return '<span class="Draft">Case Draft</span>';//darft
            }
            else if(status==1){
                return '<span class="Processing">Records Processing</span>';//Records Processing
            }
            else if(status==2){
                return '<span class="TreatmentSetup">Treatment Setup</span>';//TreatmentSetup
            }
            else if(status==3){
                return '<span class="Revision">Case Revision</span>';//Case Revision
            }
            else if(status==4){
                return '<span class="Approval">Your Approval</span>';//Your Approval
            }
            else if(status==4.5){
                return '<span class="Approval">Accountant Approval</span>';//Your Approval
            }
            else if(status==5){
                return '<span class="Fabrication">Case Fabrication</span>';//Case Fabrication
            }
            else if(status==6){
                return '<span class="Delivered">Case Delivered</span>';//Case Delivered
            }
            else if(status==7){
                return '<span class="Completed">Case Completed</span>';//Completed
            }
        }

        $scope.modelStatus=false;
        $scope.closeModelTask=()=>{
            $scope.modelStatus=false;
        }

        $scope.taskData=[];
        $scope.openModelTask=(id)=>{
            $scope.modelStatus=true;
            HTTPs.POST(CONFIG.serverUrl+"/GATFI",{idPatient:id}).then(res=>{
                res=JSON.parse(res);
                console.log(res);
                $scope.$apply(()=>{
                    $scope.taskData=res;
                });
            });

        }
        

    }],
    Router:{
        Url:"/Patients",
        Templete:'Views/Patients/Patients.html',
        Render:[
            {link:'assets/libs/datatables/dataTables.bootstrap4.css',type:"CSS"},
            {link:'assets/libs/datatables/responsive.bootstrap4.css',type:"CSS"},
            {link:'assets/libs/datatables/buttons.bootstrap4.css',type:"CSS"},
            {link:'assets/libs/datatables/select.bootstrap4.css',type:"CSS"},
            {link:'assets/libs/datatables/jquery.dataTables.min.js',type:"JS"},
            {link:'assets/libs/datatables/dataTables.bootstrap4.js',type:"JS"},
            {link:'assets/libs/datatables/dataTables.responsive.min.js',type:"JS"},
            {link:'assets/libs/datatables/dataTables.select.min.js',type:"JS"},
        ],
        AUTH:true
    }
}
    

$ANContreoller.Invoices = {
    FUN: ['$scope', '$location', '$routeParams', function ($scope, $location, $routeParams) {
        $scope.$emit('AuthChanged', true);
        $scope.text = "tetetetete ";
        const targetElement = document.querySelector('#iframeContainer');
        $scope.Templete = [
            { name: "text1", type: "T", text: "asda", left: 0, top: 0, right: 0, bottom: 0 }
        ];
        $scope.idPatient = "";
        var testId = $CRID.END($routeParams.id);
        if (testId) {
            $scope.idPatient = testId
        }
        else {
            $location.path('/NotFondPage');
            return;
        }
        var getBase64ImageFromURL = (url) => {
            return new Promise((resolve, reject) => {
                var img = new Image();
                img.setAttribute("crossOrigin", "anonymous");

                img.onload = () => {
                    var canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;

                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);

                    var dataURL = canvas.toDataURL("image/svg");

                    resolve(dataURL);
                };

                img.onerror = error => {
                    reject(error);
                };

                img.src = url;
            });
        }
        $scope.AddElement = (type, number) => {
            if (type == "text") {
                $scope.Templete.push()
            }
        }
        $scope.CreatePdf = (slogan, invoiceDate, Terms, DueDate, CaseNumber, PatientName, DrName, DrGroup, City, Country, CaseProfle, loyaltyProgram, GrossValue, ExtraDiscount, NetValue, SubTotal, Total, BalanceDue, Currancy, text1Footer, text2Footer, invoiceNumber = "INV-000000") => {
            getBase64ImageFromURL("/assets/images/Logo/logo.svg").then(res => {
                var PdfTemplete = {
                    content: [
                        {
                            columns: [
                                {
                                    svg: `<svg width="300px" id="Group_22" data-name="Group 22" xmlns="http://www.w3.org/2000/svg" width="200" height="70" viewBox="0 0 148.147 52.389">
                                    <path id="Path_9" data-name="Path 9" d="M21.146,10.964h-7a1.072,1.072,0,0,0-1.073,1.073V28.588a.73.73,0,0,0,.73.73h2.02a.731.731,0,0,0,.73-.73V22.9h4.588a6.707,6.707,0,0,0,4.782-1.611,5.673,5.673,0,0,0,1.713-4.343,5.708,5.708,0,0,0-1.713-4.37,6.712,6.712,0,0,0-4.782-1.61m2.178,8.184a3.294,3.294,0,0,1-2.333.76H16.557V13.954h4.433a3.251,3.251,0,0,1,2.333.773,2.917,2.917,0,0,1,.812,2.217,2.875,2.875,0,0,1-.812,2.2" transform="translate(2.269 1.902)" fill="#6868ac"></path>
                                    <path id="Path_10" data-name="Path 10" d="M37.958,19q0-3.994-5.541-4-5.11,0-5.865,3.654a.737.737,0,0,0,.718.884h1.745a.724.724,0,0,0,.7-.549,1.868,1.868,0,0,1,.636-1.088,3.383,3.383,0,0,1,2.037-.478,3.3,3.3,0,0,1,1.869.4,1.444,1.444,0,0,1,.554,1.251,1.252,1.252,0,0,1-.439,1.043,2.972,2.972,0,0,1-1.443.476l-2.011.181q-5.1.516-5.1,4.151a3.577,3.577,0,0,0,1.3,2.938,5.381,5.381,0,0,0,3.492,1.056,4.839,4.839,0,0,0,4.279-1.932,6.709,6.709,0,0,0,.262,1.394.357.357,0,0,0,.317.229h2.5a.315.315,0,0,0,.3-.426,5.667,5.667,0,0,1-.315-2.1Zm-3.143,4.357a3.042,3.042,0,0,1-.955,2.41,3.616,3.616,0,0,1-2.474.838,2.562,2.562,0,0,1-1.663-.476,1.626,1.626,0,0,1-.58-1.328,1.582,1.582,0,0,1,.554-1.3,3.659,3.659,0,0,1,1.842-.606l1.753-.205a3.9,3.9,0,0,0,1.078-.268.319.319,0,0,1,.444.3Z" transform="translate(4.479 2.603)" fill="#6868ac"></path>
                                    <path id="Path_11" data-name="Path 11" d="M41.418,17.671V16.208a.909.909,0,0,0-.908-.908H39.181a.908.908,0,0,0-.908.908V27.871a.729.729,0,0,0,.73.73h1.788a.73.73,0,0,0,.73-.73V21.846a3.645,3.645,0,0,1,.992-2.771,3.982,3.982,0,0,1,2.849-.941h.825v-2.99a5.752,5.752,0,0,0-.8-.052,3.983,3.983,0,0,0-3.97,2.578" transform="translate(6.64 2.619)" fill="#6868ac"></path>
                                    <path id="Path_12" data-name="Path 12" d="M61.67,22.146a7.368,7.368,0,0,0-3.518-1.391L56.475,20.5a4.225,4.225,0,0,1-1.7-.58,1.216,1.216,0,0,1-.516-1.044q0-1.546,2.321-1.547a3.506,3.506,0,0,1,2.062.5,1.773,1.773,0,0,1,.672,1.1.76.76,0,0,0,.74.589H61.6a.771.771,0,0,0,.755-.909q-.686-3.6-5.776-3.6a6.748,6.748,0,0,0-4.074,1.069,3.474,3.474,0,0,0-1.443,2.951q0,3.3,4.357,4.022l1.521.257a5.609,5.609,0,0,1,2.036.645,1.261,1.261,0,0,1,.567,1.109q0,1.6-2.629,1.6a3.589,3.589,0,0,1-2.152-.515,2.046,2.046,0,0,1-.716-1.191.755.755,0,0,0-.736-.561H51.647a.77.77,0,0,0-.751.921q.759,3.667,5.966,3.666a7.51,7.51,0,0,0,4.356-1.083A3.545,3.545,0,0,0,62.765,24.8a3.336,3.336,0,0,0-1.095-2.656" transform="translate(8.828 2.604)" fill="#6868ac"></path>
                                    <path id="Path_13" data-name="Path 13" d="M76.27,34.616h0a14.4,14.4,0,0,1-11.056-4.725.569.569,0,0,0-.783-.1l-1.469,1.12a.569.569,0,0,0-.1.81A17.364,17.364,0,0,0,76.268,37.6h0a17.362,17.362,0,0,0,13.411-5.877.569.569,0,0,0-.1-.81l-1.47-1.12a.57.57,0,0,0-.783.1A14.389,14.389,0,0,1,76.27,34.616" transform="translate(10.884 5.149)" fill="#6868ac"></path>
                                    <path id="Path_14" data-name="Path 14" d="M80.976,11.29H79.137a.909.909,0,0,0-.908.908V28.914a.73.73,0,0,0,.73.73h1.788a.73.73,0,0,0,.73-.73V11.791a.5.5,0,0,0-.5-.5" transform="translate(13.573 1.959)" fill="#6868ac"></path>
                                    <path id="Path_15" data-name="Path 15" d="M86.486,15.194l-3.248-.987V28.8a.323.323,0,0,0,.323.323h2.6a.323.323,0,0,0,.323-.323Z" transform="translate(14.442 2.465)" fill="#6868ac"></path>
                                    <path id="Path_16" data-name="Path 16" d="M46.51,15.21l3.248-.987V28.812a.323.323,0,0,1-.323.323h-2.6a.323.323,0,0,1-.323-.323Z" transform="translate(8.07 2.468)" fill="#6868ac"></path>
                                    <path id="Path_17" data-name="Path 17" d="M95.52,15.322a4.773,4.773,0,0,0-4.146,2.214v-1a.909.909,0,0,0-.908-.908H89.139a.909.909,0,0,0-.908.908V28.6a.323.323,0,0,0,.323.323h2.6a.323.323,0,0,0,.323-.323V21.477a3.163,3.163,0,0,1,1.494-2.953,2.976,2.976,0,0,1,1.638-.392,2.193,2.193,0,0,1,2.328,2.521V28.6a.323.323,0,0,0,.323.323h2.6a.323.323,0,0,0,.323-.323V20.112a4.79,4.79,0,0,0-1.25-3.542,4.613,4.613,0,0,0-3.413-1.249" transform="translate(15.308 2.658)" fill="#6868ac"></path>
                                    <path id="Path_18" data-name="Path 18" d="M106.717,15.322a6.309,6.309,0,0,0-4.766,1.906,7.047,7.047,0,0,0-1.8,5.048,6.985,6.985,0,0,0,1.829,5.048,6.336,6.336,0,0,0,4.79,1.906,6.646,6.646,0,0,0,4.018-1.2A5.547,5.547,0,0,0,112.95,24.8h-3.117a3.027,3.027,0,0,1-3.039,1.906,3.274,3.274,0,0,1-2.382-.863,4.044,4.044,0,0,1-1.069-2.563h9.942v-.772a7.507,7.507,0,0,0-1.777-5.2,6.116,6.116,0,0,0-4.79-1.983m-3.349,5.693q.463-3.168,3.322-3.168a3.123,3.123,0,0,1,2.267.85,3.882,3.882,0,0,1,1.082,2.319Z" transform="translate(17.376 2.658)" fill="#6868ac"></path>
                                    <path id="Path_19" data-name="Path 19" d="M112.421,15.794a.409.409,0,0,0-.224-.4.442.442,0,0,0,.269-.441.489.489,0,0,0-.183-.407.788.788,0,0,0-.5-.147h-.866v1.914h.433v-.711h.4a.23.23,0,0,1,.175.054.339.339,0,0,1,.065.194l.014.2a.581.581,0,0,0,.067.262h.456a.475.475,0,0,1-.082-.262Zm-.665-.546h-.411v-.471h.4c.184,0,.276.076.276.231s-.087.239-.262.239" transform="translate(19.243 2.499)" fill="#6868ac"></path>
                                    <path id="Path_20" data-name="Path 20" d="M111.824,13.659a1.863,1.863,0,0,0-1.352.537,1.831,1.831,0,0,0,0,2.624,1.981,1.981,0,0,0,2.713,0,1.85,1.85,0,0,0,0-2.624,1.873,1.873,0,0,0-1.361-.537m1.062,2.884a1.555,1.555,0,0,1-2.115-.008,1.363,1.363,0,0,1-.426-1.023,1.38,1.38,0,0,1,.426-1.039,1.544,1.544,0,0,1,2.115,0,1.488,1.488,0,0,1,0,2.07" transform="translate(19.071 2.37)" fill="#6868ac"></path>
                                    <path id="Path_21" data-name="Path 21" d="M66.707,25.6h.007l1.05-2.964h0l.7-1.986q1.01-2.695,1.962-5.469a.3.3,0,0,1,.563,0q1.178,3.413,1.986,5.465l.722,1.986h-.023L74.742,25.6h.008l1.27,3.562a.729.729,0,0,0,.688.485h2.106a.73.73,0,0,0,.681-.993L73.119,12.2a1.431,1.431,0,0,0-1.335-.914h-2.1a1.432,1.432,0,0,0-1.339.922L62.082,28.654a.729.729,0,0,0,.682.988h2.008a.73.73,0,0,0,.689-.488Z" transform="translate(10.763 1.959)" fill="#6868ac"></path>
                                    <path id="Path_22" data-name="Path 22" d="M144.454,52.389H3.692A3.7,3.7,0,0,1,0,48.7v-45A3.7,3.7,0,0,1,3.692,0H144.454a3.7,3.7,0,0,1,3.693,3.692v45a3.7,3.7,0,0,1-3.693,3.692M3.692,2.055A1.639,1.639,0,0,0,2.055,3.692v45a1.639,1.639,0,0,0,1.637,1.637H144.454a1.639,1.639,0,0,0,1.638-1.637v-45a1.639,1.639,0,0,0-1.638-1.637Z" transform="translate(0 0)" fill="#6868ac"></path>
                                    <path id="Path_23" data-name="Path 23" d="M83.952,11.307h1.811a.693.693,0,0,1,.694.692v2.366l-3.2-.987V12a.692.692,0,0,1,.692-.692" transform="translate(14.446 1.962)" fill="#6868ac"></path>
                                    <path id="Path_24" data-name="Path 24" d="M49.036,11.307H47.226a.693.693,0,0,0-.694.692v2.366l3.2-.987V12a.692.692,0,0,0-.692-.692" transform="translate(8.073 1.962)" fill="#6868ac"></path>
                                        </svg>`,
                                    alignment: "center",
                                    margin: [0, 30, 0, 0]
                                }
                            ],
                        },
                        {
                            columns: [
                                {
                                    text: slogan,
                                    bold: true,
                                    alignment: "center",
                                    margin: [0, 4, 0, 0],
                                    style: "sLogin"
                                }
                            ]
                        },
                        {
                            columns: [
                                {
                                    text: "Invoice# " + invoiceNumber,
                                    bold: true,
                                    alignment: "center",
                                    margin: [0, 8, 0, 40],
                                }
                            ]
                        },
                        {
                            columns: [
                                {
                                },
                                {
                                },
                                {
                                },
                                {
                                    text: "Invoice Date:",
                                    style: "InvoiceDate",

                                },
                                {
                                    text: invoiceDate,
                                    style: "InvoiceDate"
                                }
                            ]
                        },
                        {
                            columns: [
                                {
                                },
                                {
                                },
                                {
                                },
                                // {
                                //     text:"Terms:",
                                //     style:"InvoiceDate"
                                // },
                                // {
                                //     text:Terms,
                                //     style:"InvoiceDate"
                                // }
                            ]
                        },
                        {
                            columns: [
                                {
                                },
                                {
                                },
                                {
                                },
                                // {
                                //     text:"Due Date:",
                                //     style:"InvoiceDate"
                                // },
                                // {
                                //     text:DueDate,
                                //     style:"InvoiceDate"
                                // }
                            ]
                        },
                        {
                            columns: [
                                {
                                },
                                {
                                },
                                {
                                },
                                {
                                    text: "Case Number:",
                                    style: "InvoiceDate"
                                },
                                {
                                    text: CaseNumber,
                                    style: "InvoiceDate"
                                }
                            ]
                        },
                        {
                            columns: [
                                {

                                },
                                {
                                },
                                {
                                },
                                {
                                    text: "Patient Name:",
                                    style: "InvoiceDate"
                                },
                                {
                                    text: PatientName,
                                    style: "InvoiceDate"
                                }
                            ]
                        },
                        {
                            columns: [
                                [
                                    { text: DrName, style: "nameDR" },
                                    { text: DrGroup, style: "address" },
                                    { text: City, style: "address" },
                                    { text: Country, style: "address" },
                                ],
                                {
                                },
                                {
                                },

                            ]
                        },
                        {
                            style: 'tableExample',
                            table: {
                                headerRows: 1,
                                // dontBreakRows: true,
                                // keepWithHeaderRows: 1,
                                widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
                                body: [
                                    [{ text: '#', style: 'tableHeader', borderColor: ['#fff', '#fff', '#fff', '#fff'], border: [false, false, false, false] }, { text: 'Case Profile', style: 'tableHeader', borderColor: ['#fff', '#fff', '#fff', '#fff'], border: [false, false, false, false] }, { text: 'loyalty Program', style: 'tableHeader', borderColor: ['#fff', '#fff', '#fff', '#fff'], border: [false, false, false, false] }, { text: 'Gross Value', alignment: 'right', style: 'tableHeader', borderColor: ['#fff', '#fff', '#fff', '#fff'], border: [false, false, false, false] }, { text: 'Discount', alignment: 'right', style: 'tableHeader', borderColor: ['#fff', '#fff', '#fff', '#fff'], border: [false, false, false, false] }, { text: 'Net Value', alignment: 'right', style: 'tableHeader', borderColor: ['#fff', '#fff', '#fff', '#fff'], border: [false, false, false, false] }],
                                    [{ text: '1', margin: 4, alignment: 'left', fontSize: 9, borderColor: ['#fff', '#fff', '#fff', '#afb0b1'], border: [false, false, false, true] },
                                    { text: CaseProfle, fontSize: 9, alignment: 'left', margin: 4, borderColor: ['#fff', '#fff', '#fff', '#afb0b1'], border: [false, false, false, true] },
                                    { text: loyaltyProgram, margin: 4, fontSize: 9, borderColor: ['#fff', '#fff', '#fff', '#afb0b1'], border: [false, false, false, true] },
                                    { text: GrossValue, margin: 4, fontSize: 9, alignment: 'right', borderColor: ['#fff', '#fff', '#fff', '#afb0b1'], alignment: 'right', border: [false, false, false, true] },
                                    { text: ExtraDiscount, margin: 4, fontSize: 9, alignment: 'right', borderColor: ['#fff', '#fff', '#fff', '#afb0b1'], alignment: 'right', border: [false, false, false, true] },
                                    { text: NetValue, margin: 4, fontSize: 9, alignment: 'right', borderColor: ['#fff', '#fff', '#fff', '#afb0b1'], border: [false, false, false, true] }],
                                    [
                                        { text: "", border: [false, false, false, false] },
                                        { text: '', border: [false, false, false, false] }
                                        , { text: "", border: [false, false, false, false] },
                                        { text: "", border: [false, false, false, false] },
                                        { text: 'Sub Total', margin: 4, fillColor: "#fff", fontSize: 10, borderColor: ['#fff', '#fff', '#fff', '#afb0b1'], alignment: 'right', border: [false, false, false, false] },
                                        { text: SubTotal, margin: 4, fillColor: "#fff", fontSize: 10, borderColor: ['#fff', '#fff', '#fff', '#afb0b1'], border: [false, false, false, false], alignment: 'right' }],
                                    [
                                        { text: "", border: [false, false, false, false] },
                                        { text: '', borderColor: ['#fff', '#fff', '#fff', '#fff'], border: [false, false, true, false] }
                                        , { text: "", border: [false, false, false, false] },
                                        { text: "", border: [false, false, false, false], blod: true },
                                        { text: 'Total', style: "tableHeader2", margin: 4, fontSize: 10, borderColor: ['#fff', '#fff', '#fff', '#afb0b1'], alignment: 'right', border: [false, false, false, false] },
                                        { text: Currancy + " " + Total, style: "tableHeader2", margin: 4, blod: true, fontSize: 10, borderColor: ['#fff', '#fff', '#fff', '#afb0b1'], border: [false, false, false, false], alignment: 'right' }],

                                ],
                                layout: 'noBorders'
                            }
                        },
                    ],
                    footer: [
                        {
                            columns: [
                                {
                                    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="1857" height="100" viewBox="0 0 1857 100">
                                                    <g id="Path_463" data-name="Path 463" fill="#6868ac">
                                                    <path d="M 1856.5 99.5 L 0.5 99.5 L 0.5 0.5 L 1856.5 0.5 L 1856.5 99.5 Z" stroke="none"/>
                                                    <path d="M 1 1 L 1 99 L 1856 99 L 1856 1 L 1 1 M 0 0 L 1857 0 L 1857 100 L 0 100 L 0 0 Z" stroke="none" fill="#707070"/>
                                                    </g>
                                                </svg>
                                            `,
                                    width: "1857"
                                }
                            ]

                        },
                        {
                            text: text1Footer,
                            width: "200",
                            alignment: "center",
                            margin: [0, -150, 0, 0]
                        },
                        {
                            text: text2Footer,
                            width: "200",
                            alignment: "center",
                            margin: [0, 0, 0, 0]
                        },
                    ],
                    styles: {
                        INVOICE: {
                            fontSize: 30,
                            bold: false,
                            alignment: 'right',
                            margin: [0, 0, 0, 0]
                        },
                        NumberInvoice: {
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            margin: [0, 0, 0, 0]
                        },
                        TParisAline: {
                            fontSize: 14,
                            bold: true,
                            alignment: 'left',
                            margin: [0, 10, 0, 0]
                        },
                        InvoiceDate: {
                            fontSize: 10,
                            bold: false,
                            alignment: 'right',
                            margin: [0, 10, 0, 0]
                        },
                        nameDR: {
                            fontSize: 14,
                            bold: true,
                            alignment: 'left',
                            margin: [0, -65, 0, 0]
                        },
                        address: {
                            fontSize: 10,
                            bold: false,
                            alignment: 'left',
                            margin: [0, 3, 0, 0]
                        },
                        tableHeader: {
                            fillColor: '#6868ab',
                            color: '#fff',
                            fontSize: 9,
                            margin: [0, 5, 0, 5]
                        },
                        tableHeader2: {
                            bold: true,
                        },
                        tableExample: {
                            margin: [0, 10, 0, 0]
                        },
                        TotalPrice: {
                            fillColor: '#383737',
                            fontSize: 10,
                            bold: false,
                            alignment: 'right',
                            margin: [0, 10, 0, 0]
                        },
                        sLogin: {
                            color: '#6868ab',
                            fontSize: 14.5,
                            margin: 5
                        },
                    }
                };
                pdfMake.createPdf(PdfTemplete).getDataUrl().then((dataUrl) => {
                    targetElement.innerHTML = "";
                    const iframe = document.createElement('iframe');
                    iframe.style.width = "100%";
                    iframe.style.height = "82vh";
                    iframe.src = dataUrl + "#toolbar=0";
                    targetElement.appendChild(iframe);
                }, err => {
                    console.error(err);
                });
            });

        }
        var invoiceOpject = {};
        invoiceOpject.slogan = "Gentle Force … Enduring Smile",
            invoiceOpject.invoiceDate = new Date().toDateString(),
            invoiceOpject.Terms = "30 Days",
            invoiceOpject.DueDate = new Date().toDateString(),
            invoiceOpject.CaseNumber = $scope.idPatient,
            invoiceOpject.PatientName = "Abdullah Shaali",
            invoiceOpject.DrName = "Dr. Ragheed Obeid",
            invoiceOpject.DrGroup = "Al Muhaidib Group",
            invoiceOpject.City = "Dammam",
            invoiceOpject.Country = "Saudi Arabia",
            invoiceOpject.CaseProfle = "Paris Aline ( Comprehensive )",
            invoiceOpject.loyaltyProgram = "Test Text",
            invoiceOpject.GrossValue = "9,374.00 ",
            invoiceOpject.ExtraDiscount = "6,374.00",
            invoiceOpject.NetValue = "3,000.00",
            invoiceOpject.SubTotal = "3,000.00",
            invoiceOpject.Total = "3,000.00",
            invoiceOpject.BalanceDue = "3,000.00",
            invoiceOpject.Currancy = "SAR",
            invoiceOpject.text1Footer = "If you have any questions don't hesitate to contact us on : support@parisaline.com ",
            invoiceOpject.text2Footer = "Thanks for your business.";


        $scope.getDateIvoice = () => {
            HTTPs.POST(CONFIG.serverUrl + "/GCWIP", { id: $scope.idPatient }).then(res => {
                res = JSON.parse(res);
                // invoiceOpject.=res.
                invoiceOpject.DueDate = new Date(res[0].createdAt).toDateString();
                invoiceOpject.invoiceDate = new Date().toDateString();
                invoiceOpject.PatientName = res[0].firstName;
                invoiceOpject.DrName = res[0].nameDoctor;
                invoiceOpject.Country = res[0].countryName;
                invoiceOpject.City = res[0].cityName;
                $scope.$apply(() => {
                    $scope.refreshInvoice();
                });
                $scope.CreatePdf(invoiceOpject.slogan, invoiceOpject.invoiceDate, invoiceOpject.Terms, invoiceOpject.DueDate, invoiceOpject.CaseNumber, invoiceOpject.PatientName, invoiceOpject.DrName, invoiceOpject.DrGroup, invoiceOpject.City, invoiceOpject.Country, invoiceOpject.CaseProfle, invoiceOpject.loyaltyProgram, invoiceOpject.GrossValue, invoiceOpject.ExtraDiscount, invoiceOpject.NetValue, invoiceOpject.SubTotal, invoiceOpject.Total, invoiceOpject.BalanceDue, invoiceOpject.Currancy, invoiceOpject.text1Footer, invoiceOpject.text2Footer);
                for (var key in invoiceOpject) {
                    $('#' + key).val(invoiceOpject[key]);
                }
            });
        }
        $scope.refreshInvoice = (nameElement) => {
            invoiceOpject[nameElement] = $('#' + nameElement).val();
            $scope.CreatePdf(invoiceOpject.slogan, invoiceOpject.invoiceDate, invoiceOpject.Terms, invoiceOpject.DueDate, invoiceOpject.CaseNumber, invoiceOpject.PatientName, invoiceOpject.DrName, invoiceOpject.DrGroup, invoiceOpject.City, invoiceOpject.Country, invoiceOpject.CaseProfle, invoiceOpject.loyaltyProgram, invoiceOpject.GrossValue, invoiceOpject.ExtraDiscount, invoiceOpject.NetValue, invoiceOpject.SubTotal, invoiceOpject.Total, invoiceOpject.BalanceDue, invoiceOpject.Currancy, invoiceOpject.text1Footer, invoiceOpject.text2Footer);
        }

        $scope.taskStatus = 0;
        $scope.getStatusTask = () => {
            HTTPs.POST(CONFIG.serverUrl + "/CTS", { id: $scope.idPatient }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.taskStatus = res.data.Count;
                        $scope.getDateIvoice();
                        // $scope.refreshInvoice();
                    });
                }
            });
        }
        $scope.getStatusTask();

        $scope.FinshTask = (Commnet) => {
            HTTPs.POST(CONFIG.serverUrl + "/TSK/FT", { id: $scope.idPatient, Commnet: Commnet, invoiceOpject: invoiceOpject, exAccount: true }).then(res => {
                res = JSON.parse(res);
                if (res.message == 2000) {
                    $scope.$apply(() => {
                        $scope.taskStatus = 0;
                    });
                }
            });
        }
        $scope.RejectTash = (Commnet) => {
            HTTPs.POST(CONFIG.serverUrl + "/TSK/RT", { id: $scope.idPatient, Commnet: Commnet }).then(res => {
                res = JSON.parse(res);
                if (res.message == 2000) {
                    $scope.$apply(() => {
                        $scope.taskStatus = 0;
                    });
                }
            });
        }
        $scope.priceStratige = {};
        $scope.getMemeberDoctorWithPatientId = (id, numberAligner) => {
            HTTPs.POST(CONFIG.serverUrl + "/GMSWPI", {}, { id: id, numberAligner: numberAligner }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    $scope.$apply(() => {
                        $scope.priceStratige = res.data[0];
                        console.log($scope.priceStratige);
                    });
                }
            });
        }

        $scope.notAliner = -1;
        $scope.numberLowerAligners = 0;
        $scope.numberUpperAligners = 0;
        $scope.commentAdmin = '';
        $scope.PatientType = '';
        $scope.getCasesInformation = (id) => {
            HTTPs.POST(CONFIG.serverUrl + "/GCI", { id: id }).then(res => {
                res = JSON.parse(res);
                if (res.error == 0) {
                    if (res.data[0].LowerAligners != null) {
                        let numberAligner = 0;

                        if (res.data[0].LowerAligners < res.data[0].UpperAligners) {
                            numberAligner = res.data[0].UpperAligners;
                        }
                        else {
                            numberAligner = res.data[0].LowerAligners;
                        }
                        $scope.$apply(() => {
                            $scope.numberLowerAligners = res.data[0].LowerAligners;
                            $scope.numberUpperAligners = res.data[0].UpperAligners;
                            $scope.commentAdmin = res.data[0].commentAdmin;
                            if (res.data[0].type == 0) {
                                $scope.PatientType = 'New Patient';
                            }
                            if (res.data[0].type == 1) {
                                $scope.PatientType = 'Refinement';
                            }

                            if (res.data[0].type == 2) {
                                $scope.PatientType = 'Retainer';
                            }

                            if (res.data[0].invoiceOpject) {
                                invoiceOpject = JSON.parse(res.data[0].invoiceOpject);
                            }

                            $scope.notAliner = 0;
                            $scope.getMemeberDoctorWithPatientId($scope.idPatient, numberAligner);
                        });
                    } else {
                        $scope.$apply(() => {
                            $scope.notAliner = "There are no Number Aligner";
                        });

                    }
                }
            });
        }
        $scope.getCasesInformation($scope.idPatient);
    }

    ],
    Router: {
        Url: "/Invoices/:id",
        Templete: "/Views/Invoices/Invoices.html?v333",
        Render: [
            { link: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.3.0-beta.1/pdfmake.min.js", type: "JS" },
            { link: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.3.0-beta.1/vfs_fonts.min.js", type: "JS" },
        ],
        AUTH: true
    }
}

var Validate=(elemetForm)=>{
    let AllInput=elemetForm.querySelectorAll('[VFORM]');
    let numberError=0;
    let valueForm={};
    AllInput.forEach(res=>{
       if(res.getAttribute("required") != null)
       {
           if(getTybeElement(res)=="email")
           {
               if(ValidateEmail(res))
               {
                   VSucess(res);
                   valueForm[res.id]=res.value;
               }
               else{
                   numberError++;
                   VError(res);
               }
           }
           else if(getTybeElement(res)=="password")
           {
                if(ValidatePassword(res))
                {
                    VSucess(res);
                    valueForm[res.id]=res.value;
                }
                else{
                    numberError++;
                    VError(res);
                }
           }
           else if(getTybeElement(res)=="text"){
                if(ValidateText(res))
                {
                    VSucess(res);
                    valueForm[res.id]=res.value;
                }
                else{
                    numberError++;
                    VError(res);
                }
           }
           else if(getTybeElement(res)=="SELECT"){
                if(ValidateText(res))
                {
                    VSucess(res);
                    valueForm[res.id]=res.value;
                }
                else{
                    numberError++;
                    VError(res);
                }
            }
            else if(getTybeElement(res)=="tel"){
                if(ValidateText(res))
                {
                    VSucess(res);
                    valueForm[res.id]=res.value;
                }
                else{
                    numberError++;
                    VError(res);
                }
            }
       }
       else{
        valueForm[res.id]=res.value;
       }
    });
    if(numberError==0)
    {
        return valueForm;
    }
    return false;
}
function VSucess(res){
    res.classList.add(res.getAttribute('sclass'));//sclass sucess
    res.classList.remove(res.getAttribute('eclass'));//eclass Error Class
    let elementError=res.parentNode.querySelector('.ErrorMessage');
    if(elementError)
    {
        elementError.text="";
    }
}
function VError(res){
    res.classList.add(res.getAttribute('eclass'));//eclass Error Class
    res.classList.remove(res.getAttribute('sclass'));//sclass sucess
    let elementError=res.parentNode.querySelector('.ErrorMessage');
    if(elementError)
    {
        elementError.text=elementError.getAttribute('titleError');
    }
}

function ValidateEmail(res) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(res.value))
    {
        return (true)
    }
    return (false)
}

function ValidatePassword(res){
    let length=res.getAttribute('len')?res.getAttribute('len'):0 //len =lnegth;
    if(res.value.length >= length && res.value != "")
    {
        return true;
    }
    return false;
}
function ValidateText(res){
    let length=res.getAttribute('len')?res.getAttribute('len'):0 //len =lnegth;
    if(res.value.length >= length && res.value != "")
    {
        return true;
    }
    return false;
}

function getTybeElement(res){
    if(res.tagName=="INPUT"){
        return res.getAttribute("type");
    }
    else if(res.tagName=="SELECT"){
        return "SELECT";
    }
}
$ANDirective.dragDrop={FUN:function ($rootScope) {
    return function (scope, element, attrs) {
        $rootScope.$on('updateUpload'+attrs.id+attrs.idpatient, (event, valueFile)=> {
            if(!tempFiles)
            {
                renderFileUpload(valueFile.file,valueFile.type);
            }
            else{
                UploadFile(valueFile.numberPrograss,'','',valueFile.newPath);
            }
        });
        var imageDefult=element[0].getAttribute("defultimage");
        element[0].addEventListener('dragover', fileDragHover, false);
        element[0].addEventListener('dragleave', fileDragHover, false);
        element[0].addEventListener('drop', fileSelectHandler, false);
        element[0].addEventListener('mouseover', hoverMouseFile, false);
        element[0].addEventListener('mouseout', enterMouseFile, false);
        element[0].addEventListener('click', clickSelectFile, false);
        renderFileDrop();
        function hoverMouseFile(e){
            if(!element[0].querySelector(".divProsess") && !element[0].querySelector(".SucsessFile") )
            {
                if(e.type === 'dragover')
                {
                    e.target.classList.add("dragdropHover");
                    e.target.classList.remove("dragdrop");
                    
                }
                else{
                    e.target.classList.remove("dragdropHover");
                    e.target.classList.add("dragdrop");
                }
            }
        }
        function enterMouseFile(e){
            if(!element[0].querySelector(".divProsess") && !element[0].querySelector(".SucsessFile") )
            {
                if(e.type === 'dragover')
                {
                    e.target.classList.add("dragdropHover");
                    e.target.classList.remove("dragdrop");
                    
                }
                else{
                    e.target.classList.remove("dragdropHover");
                    e.target.classList.add("dragdrop");
                }
            }
        }
        function renderFileDrop(){
            let Items=`
            <div class="imageIcon" style="display:none;">
                <i class="icon"></i>
                <span class="dragDrop-extension"></span>
            </div>
            <div class="image">
                <img src=""  class="${attrs.imgclass}">
            </div>                            
            <div class="dragdrop"></div>
            <input type="file" style="display: none;" />`;
            element[0].innerHTML=Items;
            element[0].querySelector("img").src=imageDefult;
            element[0].querySelector("input[type='file']").addEventListener("change",fileSelectHandler,false);
            if(attrs.filesrc && attrs.filesrc != "")
            {
               let typeFIle =attrs.filesrc.split(".");
                if(typeFIle.length !=0 || typeFIle.length !=1)
                {
                    typeFIle=typeFIle[typeFIle.length-1];
                    if(typeFIle=="png" || typeFIle =="jpeg" || typeFIle=="jpg")
                    {
                        element[0].querySelector('.imageIcon').style.display="none";
                        element[0].querySelector('img').src=CONFIG.serverImageUrl+attrs.filesrc;
                    }
                    else{
                        element[0].querySelector('img').remove();
                        element[0].querySelector('.imageIcon').style.display="block"
                        element[0].querySelector('.imageIcon span').innerHTML=typeFIle;
                    }
                    let item=`<div class="SucsessFile">
                                <div>
                                    <a class="btnSuccessfuly"><i class="fe-eye"></i></a>
                                    <a class="btnRemove"><i class="fe-delete"></i></a>
                                </div>
                            </div>`;
                    $(element[0]).append(item);
                    element[0].querySelector(".btnSuccessfuly").addEventListener("click",viewImage);
                    element[0].querySelector(".btnRemove").addEventListener("click",removeFile);

                }
            }
        }
        function clickSelectFile(){
            if(!element[0].querySelector(".divProsess") && !element[0].querySelector(".SucsessFile"))
            {
              element[0].querySelector("input[type='file']").click();
            }
        }
        function fileDragHover(e) {
            if(element[0].querySelector(".ErrorFile"))
            {
                element[0].querySelector(".ErrorFile").remove();
            }
            if(!element[0].querySelector(".divProsess") && !element[0].querySelector(".SucsessFile"))
            {
                e.stopPropagation();
                e.preventDefault();
                if(e.type === 'dragover')
                {
                    e.target.classList.add("dragdropHover");
                    e.target.classList.remove("dragdrop");
                    
                }
                else{
                    e.target.classList.remove("dragdropHover");
                    e.target.classList.add("dragdrop");
                }
            }
        }
        var tempFiles=null;
        function fileSelectHandler(e) {
            if(!element[0].querySelector(".divProsess") && !element[0].querySelector(".SucsessFile"))
            {
                fileDragHover(e);
                var files = e.target.files || e.dataTransfer.files;
                renderFileUpload(files[0]);
            }
        }
        function readFiles(tempFiles,img){
            var fr = new FileReader();
            fr.onload=()=> {
                img.src= fr.result;
            }
            fr.readAsDataURL(tempFiles);
        }

        function renderFileUpload(files,typeFileTemp=null){
            if(typeFileTemp)
            {
                if(typeFileTemp)
                {
                    if(typeFileTemp=="image")
                    {
                        StartLoaderImage();
                        let img=element[0].querySelector("img");
                        if(!img)
                        {
                            element[0].querySelector(".image").innerHTML=`<img src=""  class="imagePatient">`;
                        }
                        element[0].querySelector('.imageIcon').style.display="none";
                        element[0].querySelector("img").src=files;
                        tempFiles=files;
                    }
                    else{
                        if(element[0].querySelector("img"))
                        {
                            element[0].querySelector("img").remove();
                        }
                        StartLoaderImage();
                        element[0].querySelector('.imageIcon').style.display="block"
                        element[0].querySelector('.imageIcon span').innerHTML=typeFileTemp;
                    }
                }

            }
            else{
                let typeCheckFile=element[0].getAttribute('typefile');
                tempFiles=[];
                typeCheckFile=typeCheckFile.toLowerCase().split(" ");
                let type=files.name.split(".");
                if(type.length > 0)
                {
                    if(typeCheckFile.find(x=>x==type[type.length-1].toLowerCase()))
                    {
                        tempFiles.push(files);
                    }
                }
                // Cancel event and hover styling
                if(tempFiles.length !=0)
                {
                    let ty=tempFiles[0].name.split(".");
                        ty=ty[ty.length-1].toLowerCase();
                        ty=ty.toLowerCase();
                        if(ty.toLowerCase()=="png" || ty =="jpeg" || ty=="jpg")
                        {
                            if (FileReader && tempFiles && tempFiles.length) {
                                StartLoaderImage();
                                let img=element[0].querySelector("img");
                                if(!img)
                                {
                                    element[0].querySelector(".image").innerHTML=`<img src=""  class="imagePatient">`;
                                }
                                element[0].querySelector('.imageIcon').style.display="none";
                                readFiles(tempFiles[0],element[0].querySelector("img"));
                                if(scope.$root.$$phase)
                                {
                                    scope.$emit('uploadFiles', {id:attrs.id,fileName:tempFiles[0].name,filePrograss:0,file:tempFiles[0],event:UploadFile,type:"image",idPatient:attrs.idpatient});
                                }
                                else{
                                    scope.$apply(()=>{
                                        scope.$emit('uploadFiles', {id:attrs.id,fileName:tempFiles[0].name,filePrograss:0,file:tempFiles[0],event:UploadFile,type:"image",idPatient:attrs.idpatient});
                                    });
                                }
                            }
                        }
                        else{
                            if(element[0].querySelector("img"))
                            {
                                element[0].querySelector("img").remove();
                            }
                            StartLoaderImage();
                            element[0].querySelector('.imageIcon').style.display="block"
                            element[0].querySelector('.imageIcon span').innerHTML=ty;
                            if(scope.$root.$$phase)
                            {
                                scope.$emit('uploadFiles', {id:attrs.id,fileName:tempFiles[0].name,filePrograss:0,file:tempFiles[0],event:UploadFile,type:ty,idPatient:attrs.idpatient});
                            }
                            else{
                                scope.$apply(()=>{
                                    scope.$emit('uploadFiles', {id:attrs.id,fileName:tempFiles[0].name,filePrograss:0,file:tempFiles[0],event:UploadFile,type:ty,idPatient:attrs.idpatient});
                                });
                            }
                        }
                }
                else{
                    Tost.warning("Invalid file type","Allowed files "+element[0].getAttribute('typefile'),3000);
                }
            }
            
        }
        function StartLoaderImage(){
            let item=`<div class="divProsess">
                         <a class="textProsess">0%</a>
                           <div class="spinner-border avatar-lg text-primary m-2 loaderProsess" role="status"></div>
                      </div>`;
            $(element[0]).append(item);
        }
        function UploadFile(number,img,fileErorr,newPath=null){
            element[0].querySelector(".textProsess").innerHTML=number+"%"; 
            if(number=="C")
            {
                element[0].querySelector(".divProsess").remove();
                let item=`<div class="SucsessFile">
                        <div>
                            <a class="btnSuccessfuly"><i class="fe-eye"></i></a>
                            <a class="btnRemove"><i class="fe-delete"></i></a>
                        </div>
                    </div>`;
                attrs.filesrc=newPath;
                $(element[0]).append(item);
                element[0].querySelector(".btnSuccessfuly").addEventListener("click",viewImage);
                element[0].querySelector(".btnRemove").addEventListener("click",removeFile);
            }

            if(fileErorr)
            {
                element[0].querySelector(".divProsess").remove();
               let item=`<div class="ErrorFile">
                              <p class="textError" style="width: 100%;">${fileErorr}</p>
                         </div>`;
                $(element[0]).append(item);
            }
        }
        function viewImage(){
            let img=document.querySelector('#modelViewerImage #image');
           if(element[0].querySelector("img"))
           {
            img.src=element[0].querySelector("img").src;
            $viewer.view(0);
           }
           else{
               let typ=element[0].querySelector(".imageIcon span").innerHTML;
               scope.$apply(()=>{
                     scope.$emit('showModelStl', attrs.filesrc);
                });
           }
        }
        function removeFile(){
            StartLoaderImage();
            HTTPs.POST(CONFIG.serverUrl+"/DRP",{src:attrs.filesrc}).then(res=>{
                if(res)
                {
                    element[0].querySelector(".SucsessFile").style.opacity=0;
                    if(!element[0].querySelector("img"))
                    {
                        element[0].querySelector(".imageIcon").style.display="none";   
                        element[0].querySelector(".image").innerHTML=`<img src="${imageDefult}"  class="${attrs.imgclass}">`;
                    }
                    else{
                        element[0].querySelector("img").src=imageDefult;
                    }
                    element[0].querySelector(".SucsessFile").remove();
                    element[0].querySelector(".divProsess").remove();  
                }
            });
        }
    };
}}

$ANContreoller.Accounts={
    FUN:['$scope','$location','$routeParams',function($scope,$location,$routeParams) {
        $scope.Status=0;
        $scope.$emit('AuthChanged', true);
        $scope.idPatient=-1;
        $scope.Country="214";
        $scope.TitleForm="";
        $scope.formEdit=0;
        $scope.CountryItem=[];
        $scope.CitysItemFull=[];
        $scope.CitysItem=[];
        $scope.City="3555";
        $scope.getCountrys=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/CC/GCU",{})
            .then(res=>{
                res=JSON.parse(res);
                if(res.error==0)
                {
                    $scope.$apply(()=>{
                        $scope.CountryItem=res.data;
                    });
                }
            });
        }
        $scope.getCitys=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/CC/GCI",{})
            .then(res=>{
                let data=JSON.parse(res);
                if(data.error==0)
                {
                    $scope.$apply(()=>{
                        $scope.CitysItemFull=data.data;
                        $scope.CitysItem=$scope.CitysItemFull.filter(x=>x.countryId==$scope.Country);
                    });
                }
            });
        }
        $scope.getCountrys();
        $scope.getCitys();
        $scope.changeCountry=(id=null)=>{
            $scope.CitysItem=$scope.CitysItemFull.filter(x=>x.countryId==$scope.Country);
            if(id)
            {
                $scope.City=id;
            }
            else{
                $scope.City=$scope.CitysItem[0].id;
            }
        }
        $scope.Edit=()=>{
            $scope.formEdit=1;
            EnableForm();
        }
        $scope.openFIle=()=>{
            $('#fileImageUser').click();
        }
        var FileUpload=null;
        document.getElementById('fileImageUser').addEventListener("change",(file)=>{
            var input = file.target;
    
            var reader = new FileReader();
            reader.onload = function(){
                $('#imageUser').attr("src",reader.result);
            };
            FileUpload=input.files[0];
            reader.readAsDataURL(input.files[0]);
        });
        $scope.DataAccount={};
        var displedForm=()=>{
            $("#phone").attr("disabled","disabled");
            $("#email").attr("disabled","disabled");
            $("#countryId").attr("disabled","disabled");
            $("#cityId").attr("disabled","disabled");
            $("#fullName").attr("disabled","disabled");
            $("#fileImageUser").attr("disabled","disabled");
        }
        var EnableForm=()=>{
            $("#phone").removeAttr("disabled");
            $("#email").removeAttr("disabled");
            $("#countryId").removeAttr("disabled");
            $("#cityId").removeAttr("disabled");
            $("#fullName").removeAttr("disabled");
            $("#fileImageUser").removeAttr("disabled");
        }
        $scope.getAll=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/GPA",{}).then(res=>{
                res=JSON.parse(res);
                if(res.error==0)
                {
                    $scope.$apply(()=>{
                        $scope.DataAccount=res.data;
                        iti.setNumber(res.data.phoneNumber);
                        displedForm();
                    });
                }
            });
        }
        $scope.LoaderForm=false;
        $scope.Save=()=>{
            var valueForm=Validate(document.getElementById('modelProfileForm'));
            if(!valueForm)
            {
                return false;
            }
            if(!iti.isValidNumber())
            {
                $('#phone').addClass("errorInput");
                $('#phone').removeClass("sucssInput");
                $('.ErrorMessagePhone').text($('.ErrorMessagePhone').attr("titleError"));
                return;
            }
            else{
                $('#phone').removeClass("errorInput");
                $('#phone').addClass("sucssInput");
            }
            valueForm['phoneNumber']=iti.getNumber();
            $scope.LoaderForm=true;
            console.log(valueForm);
            var dataF=new FormData();
            dataF.append("fileData",FileUpload);
            Reloader.Start('#formInformationPatient');
            HTTPs.POST(CONFIG.serverUrl+"/UPA",dataF,valueForm).then(res=>{
                res=JSON.parse(res);
                if(res.data)
                {
                    $scope.$apply(()=>{
                        $scope.LoaderForm=false;
                        $scope.getAll();
                        $scope.formEdit=0;
                        displedForm();
                    });
                }
            });
        }
    
    
    
    
        //renderInput Message box 
        
    
        var input = document.querySelector("#phone");
        var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
    
        // initialise plugin
        var iti = window.intlTelInput(input, {
            initialCountry: "auto",
            nationalMode: true,
            formatOnDisplay: true,
            separateDialCode: true,
            autoFormat:true,
            utilsScript: "/assets/libs/tellPhone/utils.js?1638200991544"
        });
    
        $scope.logout=()=>{
            $cookies.remove("PUD");
            location.reload();
        }
        var reset = function() {
            input.classList.add('errorInput');
        };
        
        // on blur: validate
        input.addEventListener('blur', function(e) {
            reset();
            if (input.value.trim()) {
                if (iti.isValidNumber()) {
                    input.classList.add("sucssInput");
                    input.classList.remove("errorInput");
                } else {
                    input.classList.remove("sucssInput");
                    input.classList.add("errorInput");
                }
            }
        });
    
        // on keyup / change flag: reset
        input.addEventListener('change', reset);
        input.addEventListener('keyup', reset);
        input.addEventListener("keydown", (e)=>{
            placHolder(e);
        });
        $('.iti__selected-flag').click(res=>{
            $(input).mask("000000000000000000000");
        });
        input.addEventListener("countrychange", function(e) {
            placHolder(e,true);
            });
            var placHolder=(e,maskEvev=null)=>{
            let plac= e.target.getAttribute("placeholder");
            let stringTemp="";
            let mask="";
            if(plac)
            {
                for(var i=0;i<plac.length;i++)
                {
                    if(plac[i] !='-' && plac[i] != "(" && plac[i]!= ")" && plac[i] != " ")
                    {
                            stringTemp+="x";
                            mask+="0";
                    }
                    else{
                            stringTemp+=plac[i];
                            mask+=plac[i];
                    }
                }
                e.target.setAttribute('placeholder',stringTemp);
                if(maskEvev)
                {
                    $(input).mask(mask);
                }
            }
            }
    
            $scope.getAll();
    }],
    Router:{
        Url:'/Settings/Accounts/',
        Templete:'Views/settings/Accounts.html',
        Render:[
            {link:'assets/libs/animate/animate.min.css',type:"CSS"},
            {link:'assets/libs/ladda/ladda-themeless.min.css',type:"CSS"},
            {link:'assets/libs/tellPhone/intlTelInput.min.css',type:"CSS"},
            {link:'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',type:"JS"},
            {link:'https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js',type:"JS"},
            {link:'assets/libs/tellPhone/intlTelInput.min.js',type:"JS"},
            {link:'assets/libs/jquery-mask-plugin/jquery.mask.min.js',type:"JS"},
            {link:'assets/libs/autonumeric/autoNumeric-min.js',type:"JS"},
            {link:'assets/libs/ladda/spin.js',type:"JS"},
            {link:'assets/libs/ladda/ladda.js',type:"JS"},
            {link:'assets/libs/parsleyjs/parsley.min.js',type:"JS"},
        ],
        AUTH:true
    }
}
$ANContreoller.Dcotors={
    FUN:['$scope','$location',function($scope,$location){
        $scope.$emit('AuthChanged', true);

        //GAD
        $scope.titletest="WELCOME TO KIVEN";
        var tabel= $('#scroll-vertical-datatable').DataTable({
            "scrollY":"300px",
            "min-height":"200px",
            "scrollCollapse": true,
            "pagingType": "full_numbers",
            "language": {
                "paginate": {
                    "previous": "<i class='mdi mdi-chevron-left'>",
                    "next": "<i class='mdi mdi-chevron-right'>"
                }
            },
            "drawCallback": function () {
                $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
            }
        });
    
        //load All Doctors
        $scope.getAllDoctors=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/GAD",{}).then(res=>{
                tabel.clear().draw();
                res=JSON.parse(res);
                res.forEach(row => {
                    tabel.row.add([
                        `<a href="#" style="width:100%;text-align:center;display: block;">${row.id}</a>`,
                        `<img src="${CONFIG.serverImageUrl+row.logo}">${row.nameDoctor}`,
                        `<a style="text-align:center;display: block;">${row.CountPatients}</a>`,
                        `<a style="text-align:center;display: block;">${row.CountInvoices}</a>`,
                        `<a style="text-align:center;display: block;">${row.DelverdCases}</a>`,
                        `<a style="text-align:center;display: block;">${getStatusDoctors(row.status)}</a>`,
                        `${getButton(row.status,row.id)}`,
                    ]).draw(); 
                    
                });
                RenderEventButton();
            });
        }
    
        var getStatusDoctors=(status)=>{
            if(status==0)
            {
                return '<span class="DoctorStopped">Doctor Stopped</span>';//Draft
            }
            else if(status==1){
                return '<span class="DoctorActivted">Doctor Activated</span>';//darft
            }
        }
        var getButton=(status,id)=>{
            let item=`
                    <div class="btn-group" style="width:100%">
                        <button type="button" class="btn dropdown-toggle float-right" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: #6868ab;box-shadow: none;padding: 0px 0px;font-size: 29px;"><i class="mdi mdi-dots-horizontal"></i></button>
                        <div class="dropdown-menu dropdown-menu-right">
                            `+((status == 1)?`<a class="dropdown-item btnClickStoped" data-id="${id}" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 65.518 65.518" style="width:11px;fill: red; " xml:space="preserve">
                                    <g>
                                        <path d="M32.759,0C14.696,0,0,14.695,0,32.759s14.695,32.759,32.759,32.759s32.759-14.695,32.759-32.759S50.822,0,32.759,0z    M6,32.759C6,18.004,18.004,6,32.759,6c6.648,0,12.734,2.443,17.419,6.472L12.472,50.178C8.443,45.493,6,39.407,6,32.759z    M32.759,59.518c-5.948,0-11.447-1.953-15.895-5.248l37.405-37.405c3.295,4.448,5.248,9.947,5.248,15.895   C59.518,47.514,47.514,59.518,32.759,59.518z"/>

                                    </svg>
                            
                            Stop </a>`:'')+`
                            `+((status == 0)?`<a class="dropdown-item btnClickActive" data-id="${id}" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 117.72 117.72" style="width:11px;fill: green; " xml:space="preserve">
                            <g><path class="st0" d="M58.86,0c9.13,0,17.77,2.08,25.49,5.79c-3.16,2.5-6.09,4.9-8.82,7.21c-5.2-1.89-10.81-2.92-16.66-2.92 c-13.47,0-25.67,5.46-34.49,14.29c-8.83,8.83-14.29,21.02-14.29,34.49c0,13.47,5.46,25.66,14.29,34.49 c8.83,8.83,21.02,14.29,34.49,14.29s25.67-5.46,34.49-14.29c8.83-8.83,14.29-21.02,14.29-34.49c0-3.2-0.31-6.34-0.9-9.37 c2.53-3.3,5.12-6.59,7.77-9.85c2.08,6.02,3.21,12.49,3.21,19.22c0,16.25-6.59,30.97-17.24,41.62 c-10.65,10.65-25.37,17.24-41.62,17.24c-16.25,0-30.97-6.59-41.62-17.24C6.59,89.83,0,75.11,0,58.86 c0-16.25,6.59-30.97,17.24-41.62S42.61,0,58.86,0L58.86,0z M31.44,49.19L45.8,49l1.07,0.28c2.9,1.67,5.63,3.58,8.18,5.74 c1.84,1.56,3.6,3.26,5.27,5.1c5.15-8.29,10.64-15.9,16.44-22.9c6.35-7.67,13.09-14.63,20.17-20.98l1.4-0.54H114l-3.16,3.51 C101.13,30,92.32,41.15,84.36,52.65C76.4,64.16,69.28,76.04,62.95,88.27l-1.97,3.8l-1.81-3.87c-3.34-7.17-7.34-13.75-12.11-19.63 c-4.77-5.88-10.32-11.1-16.79-15.54L31.44,49.19L31.44,49.19z"/></g></svg>
                            
                            Active </a>`:'')+`
                        </div>
                    </div>
            `;
            return item;
        }
        var RenderEventButton=()=>{
            $('.btnClickStoped').click((e)=>{
                stopDoctor($(e.target).attr("data-id"));
            });
            $('.btnClickActive').click((e)=>{
                ActiveDoctor($(e.target).attr("data-id"));
            });
        }
        var stopDoctor=(id)=>{
            HTTPs.POST(CONFIG.serverUrl+"/STD",{id:id,staus:0}).then(res=>{
                res=JSON.parse(res);
                if(res.data==id)
                {
                    $scope.$apply(()=>{
                        $scope.getAllDoctors();
                    });
                }
            });
        }
        var ActiveDoctor=(id)=>{
            HTTPs.POST(CONFIG.serverUrl+"/ACD",{id:id,staus:0}).then(res=>{
                res=JSON.parse(res);
                if(res.data==id)
                {
                    $scope.$apply(()=>{
                        $scope.getAllDoctors();
                    });
                }
            });
        }

        $scope.getAllDoctors();
    }],
    Router:{
        Url:"/Doctors",
        Templete:"Views/Doctors/Doctors.html",
        Render:[            
        {link:'assets/libs/datatables/dataTables.bootstrap4.css',type:"CSS"},
        {link:'assets/libs/datatables/responsive.bootstrap4.css',type:"CSS"},
        {link:'assets/libs/datatables/buttons.bootstrap4.css',type:"CSS"},
        {link:'assets/libs/datatables/select.bootstrap4.css',type:"CSS"},
        {link:'assets/libs/datatables/jquery.dataTables.min.js',type:"JS"},
        {link:'assets/libs/datatables/dataTables.bootstrap4.js',type:"JS"},
        {link:'assets/libs/datatables/dataTables.responsive.min.js',type:"JS"},
        {link:'assets/libs/datatables/dataTables.select.min.js',type:"JS"}
    ],
        AUTH:true
    }
}
$ANContreoller.Layouts={FUN:['$scope','$rootScope','$location',function($scope,$rootScope,$location){
    $rootScope.$on('AuthChanged', (event, value)=> {
        $scope.IsAuth = value;
    });
    $scope.IsAuth=false;
}]};

$ANContreoller.topbar={FUN:['$scope','$cookies','$rootScope','$location',function($scope,$cookies,$rootScope,$location) {
    $scope.user=JSON.parse($cookies.get('PUA'));
    $scope.chatNotf=[];
    $scope.getAllChatNotf=()=>{
        HTTPs.POST(CONFIG.serverUrl+"/GACF",{}).then(res=>{
            res=JSON.parse(res);
            if(res.error==0)
            {
                $scope.$apply(()=>{
                    for(var o=0;o<res.data.length;o++)
                    {
                        res.data[o].patientId=$CRID.TO(res.data[o].patientId.toString());
                    }
                    $scope.chatNotf=res.data;
                });
               
            }
        });
    }
    $scope.getAllChatNotf();
    $rootScope.$on('updateChatNotifi', (event, valueFile)=> {
        $scope.getAllChatNotf();
    });
    const socket = io(CONFIG.serverSocket,{reconnect: true,query:{token:$scope.user.token}});
    socket.on('NOTF',(msg)=> {
        if(msg.content)
        {
            if(msg.content[0].section=="Message")
            {
                $scope.$apply(()=>{
                    if(rootEvents.find(x=>x=='CHAT'+msg.content[0].patientId))
                    {
                        $scope.$emit('CHAT'+msg.content[0].patientId,true);
                    }
                    else{
                        $scope.getAllChatNotf();
                    }
                });
            }
            else
            {
                $scope.getAllNot();
            }
        }
    });

    $scope.notfiArray=[];
    $scope.getAllNot=()=>{
        // HTTPs.POST(CONFIG.serverUrl+"/GALN",{}).then(res=>{
        //     res=JSON.parse(res);
        //     $scope.$apply(()=>{
        //         $scope.notfiArray=[];
        //         res.data.forEach((notfi)=>{
        //             notfi.content=JSON.parse(notfi.content);
        //             notfi.content[0]['id']=notfi.id;
        //             $scope.notfiArray.push(notfi.content);
        //         });
        //     });
        // });
    }
    $scope.goToLinkNote=(id,link)=>{
        HTTPs.POST(CONFIG.serverUrl+"/UNOT",{id:id}).then(res=>{
            $scope.$apply(()=>{
                $scope.getAllNot();
                $location.path("/Cases/"+$CRID.TO(link.toString()));
            });
        });
    }
    $scope.getAllNot();
    $scope.LogOut=()=>{
        $cookies.remove('PUA');
        location.reload();
    }
    $scope.files=[];
    $rootScope.$on('uploadFiles', (event, valueFile)=> {
        let file=$scope.files.find(x=>x.fileName==valueFile.fileName);
        if(!file)
        {
            var fr = new FileReader();
            fr.onload=()=> {
                $scope.$apply(()=>{
                    valueFile['image']=fr.result;
                    $scope.uploadFiles(valueFile);
                })
            }
            fr.readAsDataURL(valueFile.file);
        }
        
    });
    $scope.uploadFiles=(file,idPatient=null,fileName=null)=>{
        let num=0;
        idPatient=file.idPatient;
        fileName=file.fileName;
        $scope.files.push(file);
        let dataF=new FormData();
        dataF.append("fileData",file.file);
        HTTPs.POSTFile(CONFIG.serverUrl+"/uploadFile",dataF,{directionName:"K"+idPatient+"/"+file.id},(e)=>{
            if(e != "C")
            {
                e=(e.loaded/e.total*100).toFixed(2);
            }
            if(e==100.00)
            {
                e=100;
            }
            $scope.$apply(()=>{
                let file=$scope.files.find(x=>x.fileName==fileName);
                if(file)
                {
                    file.filePrograss=e;
                    $scope.$emit('updateUpload'+file.id+idPatient,{numberPrograss:file.filePrograss,file:file.image,type:file.type});
                    
                }
            })
        }).then(res=>{
            if(res)
            {
                res=JSON.parse(res);
                $scope.$apply(()=>{
                    $scope.$emit('updateUpload'+file.id+idPatient,{numberPrograss:"C",file:file.image,type:file.type,newPath:res.path});
                    $scope.files.splice($scope.files.indexOf(file),1);
                });
            }
        });
        // var myinterV=setInterval(()=>{
        //     if(num==100)
        //     {
        //         clearInterval(myinterV);

        //         return;
        //     }
        //     num++;
        //     $scope.$apply(()=>{
        //         let file=$scope.files.find(x=>x.fileName==fileName);
        //         if(file)
        //         {
        //             file.filePrograss=num;
        //             $scope.$emit('updateUpload'+file.id+idPatient,{numberPrograss:file.filePrograss,file:file.file});
        //         }
        //     })
        // },100);
    }

}
]};

$ANContreoller.left_side={FUN:['$scope',function($scope) {
    $scope.init=()=>{
 
     var $this=this;
          // Left menu collapse
      $('.button-menu-mobile').on('click', function (event) {
         event.preventDefault();
         $('body').toggleClass('sidebar-enable');
         if ($(window).width() >= 768) {
             $('body').toggleClass('enlarged');
         } else {
             $('body').removeClass('enlarged');
         }
 
         // sidebar - scroll container
         $('.slimscroll-menu').slimscroll({
             height: 'auto',
             position: 'right',
             size: "8px",
             color: '#9ea5ab',
             wheelStep: 5,
             touchScrollStep: 20
         });
     });
 
     // sidebar - main menu
     $("#side-menu").metisMenu();
 
     // sidebar - scroll container
     $('.slimscroll-menu').slimscroll({
         height: 'auto',
         position: 'right',
         size: "8px",
         color: '#9ea5ab',
         wheelStep: 5,
         touchScrollStep: 20
     });
 
     // right side-bar toggle
     $('.right-bar-toggle').on('click', function (e) {
         $('body').toggleClass('right-bar-enabled');
     });
 
     $(document).on('click', 'body', function (e) {
         if ($(e.target).closest('.right-bar-toggle, .right-bar').length > 0) {
             return;
         }
 
         if ($(e.target).closest('.left-side-menu, .side-nav').length > 0 || $(e.target).hasClass('button-menu-mobile')
             || $(e.target).closest('.button-menu-mobile').length > 0) {
             return;
         }
 
         $('body').removeClass('right-bar-enabled');
         $('body').removeClass('sidebar-enable');
         return;
     });
 
     // activate the menu in left side bar based on url
     $("#side-menu a").each(function () {
         var pageUrl = window.location.href.split(/[?#]/)[0];
         if (this.href == pageUrl) {
             $(this).addClass("active");
             $(this).parent().addClass("active"); // add active to li of the current link
             $(this).parent().parent().addClass("in");
             $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
             $(this).parent().parent().parent().addClass("active");
             $(this).parent().parent().parent().parent().addClass("in"); // add active to li of the current link
             $(this).parent().parent().parent().parent().parent().addClass("active");
         }
     });
 
    }
 }
 ]};
$ANContreoller.viewerStl={FUN:['$scope','$rootScope',function($scope,$rootScope) {
    $scope.display=false;
    var stl_viewer=null;
    $scope.srcFile="";
    $scope.animated=false;
    $scope.amited=()=>{
        if($scope.animated)
        {
            stl_viewer.animate_model(1, {delta:null} );
            $scope.animated=false;
        }
        else{
            stl_viewer.animate_model(1, {delta:{rotationx:1, msec:1000, loop:true}} );
            $scope.animated=true;
          
        }
    }
    $scope.init = function(pageTitle) {
      stl_viewer=new StlViewer(document.getElementById("sstl"), 
        { 
            loading_progress_callback:(load_status, load_session)=>{
                var loaded=0;
                var total=0;
                console.log("adasdasd");
                console.log(load_status);
                //go over all models that are/were loaded
                Object.keys(load_status).forEach(function(model_id)
                {
                    if (load_status[model_id].load_session==load_session) //need to make sure we're on the last loading session (not counting previous loaded models)
                    {
                        let prograss=(load_status[model_id].loaded/load_status[model_id].total*100).toFixed(0);
                        document.getElementById('textProssessSpanStl').innerHTML=prograss;
                    }
                });
            },
            all_loaded_callback:()=>{
                document.getElementById('loaderStlPrograss').remove();
            },
                models: [] 
            }
        );
        stl_viewer.add_model({id:1,filename:CONFIG.serverImageUrl+$scope.srcFile,pacity:0.2, z:-10, color:"#7a7a7a"});
    }

    $rootScope.$on('showModelStl', (event, valueFile)=> {
        $scope.display=true;
        $scope.srcFile=valueFile;
    });
    $scope.close=()=>{
        stl_viewer.remove_model(1);
        $scope.display=false;

    }
}]};


$ANDirective.format={FUN:function ($rootScope) {
    return function (scope, element, attrs) {
        var type=attrs.typeInput;
        element[0].addEventListener('keypress',(evt)=>{
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)&& evt.key!='+') {
                evt.preventDefault();
                return false;
            }
            return true;
        })
    };
}}
var CONT_AdditionalInstructions=function($scope,$location,$rootScope) {
    this.$onInit = function() {
        $scope.datatest=this.filters;
        $scope.buttonNext=this.buttonNext;
        $scope.nextTab=()=>{
            $scope.buttonNext();
        };
        var audio=new Audio('assets/sounds/send.wav');
        setTimeout(() => {
            $('.boxChat .boxItems').animate({ scrollTop: $(".boxChat .boxItems .box").height() }, 1000);
        }, 100);
        const inputMessage = document.querySelector('.boxChat .boxInput textarea');
        function setNewSize() {
            if(this.scrollHeight <= 130)
            {
                this.style.height="25px";
                this.style.height = this.scrollHeight + "px";
                this.style.overflowY="hidden";
            }
            else{
                this.style.height="130px";
                this.style.overflowY="auto";
            }
        }
        inputMessage.addEventListener('keyup', setNewSize);
    
        $scope.dataChat=[];
        $scope.GetAll=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/GAAI",{patientId:this.idPatient}).then(res=>{
                res=JSON.parse(res);
                if(res.error==0)
                {
                    $scope.$apply(()=>{
                        $scope.dataChat=res.data;
                        $scope.$emit("updateChatNotifi",true);
                    });
                }
            });
        }
        $scope.inputMessage="";
        $scope.sendMessage=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/CAAI",{patientId:this.idPatient,message:inputMessage.value}).then(res=>{
                res=JSON.parse(res);
                if(res.error==0)
                {
                    if(res.message==2000)
                    {
                        $scope.$apply(()=>{
                            $scope.GetAll();
                            inputMessage.value="";
                            inputMessage.style.height="25px";
                            audio.play();
                            $scope.inputMessage="";
                            setTimeout(() => {
                                $('.boxChat .boxItems').animate({ scrollTop: $(".boxChat .boxItems .box").height() }, 1000);
                            }, 100);
                        });
                    }
                }
            });
        }

        rootEvents.push('CHAT'+this.idPatient);
        $rootScope.$on('CHAT'+this.idPatient, (event, valueFile)=> {
            $scope.GetAll();
            audio.play();
            $scope.inputMessage="";
            setTimeout(() => {
                $('.boxChat .boxItems').animate({ scrollTop: $(".boxChat .boxItems .box").height() }, 1000);
            }, 100);
        });
        $scope.GetAll();
        $scope.$on('$destroy',()=> {
            rootEvents=rootEvents.filter(x=>x!='CHAT'+this.idPatient);
        });
    }
}

    //compnanent  for Cases
    adminApp.controller('AdditionalInstructions', ['$scope','$location','$rootScope',CONT_AdditionalInstructions]);

    adminApp.component('additionalInstructions', {
        bindings: { 
            filters: '@',
            buttonNext: '&',
            idPatient: '<',
        },
        templateUrl: 'Views/Cases/Components/AdditionalInstructions.html',
        controller: 'AdditionalInstructions'
    });
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
        }
    }],
    Templete:"Views/Cases/Components/CreateOrder.html",
    Paramter:{ 
        filters: '@',
        buttonNext: '&',
        idPatient: '<',
        deleteCases: '<',
    }
}

    
// adminApp.controller('CreateOrder', ['$scope','$location','$routeParams','$rootScope',CONT_CreateOrder]);

// adminApp.component('createOrder', {
//     bindings: { 
//         idPatient: '<',
//         buttonNext: '&',
//         buttonBack: '&',
//         showModelShippingCreate: '&',
//     },
//     templateUrl: 'Views/Cases/Components/CreateOrder.html',
//     controller: 'CreateOrder'
// });
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

var CONT_PatientRecords=function($scope,$location) {
    $scope.idPatient=-1;
    this.$onInit = function() {
        $scope.PR=[];
        HTTPs.POST(CONFIG.serverUrl+"/GRP",{id:this.idPatient}).then(res=>{
            res=JSON.parse(res);
            if(res.message==2000)
            {
                $scope.$apply(()=>{
                    $scope.PR=res.data;
                });
            }
        });
        $scope.idPatient=this.idPatient;
        $scope.nextTab=()=>{
            this.buttonNext();
        };
        $scope.backTab=()=>{
            this.buttonBack();
        };
        $scope.files=[
            {name:"",src:"assets/images/imagePatient/2.png",status:0,prosessNumber:0}
        ];
    }
}


adminApp.controller('PatientRecords', ['$scope','$location',CONT_PatientRecords]);
adminApp.component('patientRecords', {
    bindings: { 
        idPatient: '<',
        buttonNext: '&',
        buttonBack: '&'
    },
    templateUrl: 'Views/Cases/Components/PatientRecords.html',
    controller: 'PatientRecords'
});

var CONT_SubmitCase=function($scope,$location) {
    this.$onInit = function() {
        $scope.datatest=this.filters;
        $scope.buttonNext=this.buttonNext;
        $scope.Submit=false;
        $scope.nextTab=()=>{
            $scope.buttonNext();
        };
        $scope.Submited=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/CS",{id:this.idPatient}).then(res=>{
                res=JSON.parse(res);
                if(res.message==2001)
                {
                    $scope.$apply(()=>{
                        $scope.Submit=true;
                        this.btnHideNav();
                    });
                }
            });
        }
    }
}


adminApp.controller('SubmitCase', ['$scope','$location',CONT_SubmitCase]);

adminApp.component('submitCase', {
    bindings: { 
        filters: '@',
        buttonNext: '&',
        btnHideNav: '&',
        idPatient: '<',
    },
    templateUrl: 'Views/Cases/Components/SubmitCase.html',
    controller: 'SubmitCase'
});

var CONT_tretmentPlan=function($scope,$location,$sce) {
    this.$onInit = function() {
        $scope.datatest=this.filters;
        $scope.buttonNext=this.buttonNext;
        $scope.Submit=false;
        $scope.nextTab=()=>{
            $scope.buttonNext();
        };
        $scope.Submited=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/CS",{id:this.idPatient}).then(res=>{
                res=JSON.parse(res);
                if(res.message==2001)
                {
                    $scope.$apply(()=>{
                        $scope.Submit=true;
                        this.btnHideNav();
                    });
                }
            });
        }

        $scope.TremtentLevel=[];
        $scope.getAll=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/GTP",{patientId:this.idPatient}).then(res=>{
                res=JSON.parse(res);
                if(res.error==0)
                {
                   $scope.$apply(()=>{
                       console.log(res);
                    for(var i=0;i<res.data.length;i++)
                    {
                        $scope.Tabs.push({id:res.data[i].id,link:URLStatICBAS+"/CV/"+$CRID.TO(res.data[i].id.toString()),nLevel:res.data[i].nLevel,salary:res.data[i].salary,set:(i==res.data.length-1?true:false),select:'Setup'
                            ,Setup:res.data[i].pdfLink.Setup.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[i].pdfLink.Setup[0].path),
                            Simulation:res.data[i].pdfLink.Simulation.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[i].pdfLink.Simulation[0].path),
                            Right:res.data[i].pdfLink.Right.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[i].pdfLink.Right[0].path),
                            Left:res.data[i].pdfLink.Left.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[i].pdfLink.Left[0].path),
                            Frontal:res.data[i].pdfLink.Frontal.length==0?null:$sce.trustAsResourceUrl(CONFIG.serverImageUrl+res.data[i].pdfLink.Frontal[0].path),
                        });
                    }
                   });
                }
            });
        }
        $scope.getAll();

        $scope.Tabs=[]
        $scope.TabsLevel=[]

        $scope.setTabs=(id)=>{
            $scope.Tabs.forEach(res => {
                if(res.id==id)
                {
                    res.set=true;
                }
                else{
                    res.set=false;
                }
            });
        }
        $scope.approval=()=>{
            HTTPs.POST(CONFIG.serverUrl+"/CAP",{patientId:this.idPatient}).then(res=>{
                res=JSON.parse(res);
                if(res.error==0)
                {
                    $scope.$apply(()=>{
                        $location.path('/');
                    });
                }
            });
        }
        $scope.setSelect=(select,nLevel)=>{
            $scope.Tabs.find(x=>x.nLevel==nLevel).select=select;
        }
        $scope.CopyLink=()=>{
            var copyText = document.getElementById("linkShereyStringsUrl");
            copyText.select();
            document.execCommand("copy");
            Tost.info("Link copied","",3000);
        }
    }
}

adminApp.controller('tretmentPlan', ['$scope','$location','$sce',CONT_tretmentPlan]);

adminApp.component('tretmentPlan', {
    bindings: { 
        filters: '@',
        buttonNext: '&',
        idPatient: '<',
        status: '<',
    },
    templateUrl: 'Views/Cases/Components/tretmentPlan.html',
    controller: 'tretmentPlan'
});



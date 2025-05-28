$ANContreoller.Invoices={
    FUN:['$scope','$location','$routeParams',function($scope,$location,$routeParams){
        $scope.$emit('AuthChanged', true);
        $scope.text="tetetetete ";
        const targetElement = document.querySelector('#iframeContainer');
        $scope.Templete=[
            {name:"text1",type:"T",text:"asda",left:0,top:0,right:0,bottom:0}
        ];

        var getBase64ImageFromURL=(url)=> {
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
        $scope.AddElement=(type,number)=>{
            if(type=="text")
            {
                $scope.Templete.push()
            }
        }
        $scope.CreatePdf=()=>{
            getBase64ImageFromURL("http://localhost:3000/assets/images/Logo/logo.svg").then(res=>{
            console.log(res);    
            var PdfTemplete={
                    content:[
                        {
                            columns:[
                                {
                                    svg: `<svg id="Group_22" data-name="Group 22" xmlns="http://www.w3.org/2000/svg" width="148.147" height="52.389" viewBox="0 0 148.147 52.389">
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
                                width: 200
                                },
                                [
                                    {
                                        text:'INVOICE',
                                        style:'INVOICE',
                                        width: '*',
                                    },
                                    {
                                        text:'Invoice# INV-000002',
                                        style:"NumberInvoice",
                                        width: '*',
                                    }
                                ]
                        ],
                        },
                        {
                            columns:[
                                {
                                    text:"ParisAline",
                                    bold:true,
                                    style:"TParisAline"
                                }
                            ]
                        },
                        {
                            columns:[
                                {
                                    text:"İstanbul",
                                    bold:false,
                                    style:"TCity"
                                }
                            ]
                        },
                        {
                            columns:[
                                {
                                    text:"Turkey",
                                    bold:false,
                                    style:"TCaountry"
                                }
                            ]
                        },
                        {
                            columns:[
                                {
                                },
                                {
                                },
                                {
                                },
                                {
                                    text:"Invoice Date:",
                                    style:"InvoiceDate"
                                },
                                {
                                    text:"24 Jan 2022",
                                    style:"InvoiceDate"
                                }
                            ]
                        },
                        {
                            columns:[
                                {
                                },
                                {
                                },
                                {
                                },
                                {
                                    text:"Terms:",
                                    style:"InvoiceDate"
                                },
                                {
                                    text:"30 Days",
                                    style:"InvoiceDate"
                                }
                            ]
                        },
                        {
                            columns:[
                                {
                                },
                                {
                                },
                                {
                                },
                                {
                                    text:"Due Date:",
                                    style:"InvoiceDate"
                                },
                                {
                                    text:"23 Feb 2022",
                                    style:"InvoiceDate"
                                }
                            ]
                        },
                        {
                            columns:[
                                {
                                },
                                {
                                },
                                {
                                },
                                {
                                    text:"Case Number:",
                                    style:"InvoiceDate"
                                },
                                {
                                    text:"129564373",
                                    style:"InvoiceDate"
                                }
                            ]
                        },
                        {
                            columns:[
                               {
                                   
                               },
                                {
                                },
                                {
                                },
                                {
                                    text:"Patient Name:",
                                    style:"InvoiceDate"
                                },
                                {
                                    text:"Abdullah Shaali",
                                    style:"InvoiceDate"
                                }
                            ]
                        },
                        {
                            columns:[
                                [
                                    {text:"Dr. Ragheed Obeid",style:"nameDR"},
                                    {text:"Al Muhaidib Group",style:"address"},
                                    {text:"Dammam",style:"address"},
                                    {text:"Saudi Arabia",style:"address"},
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
                                widths: ['auto', '*','auto','auto','auto'],
                                body: [
                                    [{text: '#', style: 'tableHeader',borderColor: ['#fff', '#fff', '#fff', '#fff'],border: [false, false, true, false]}, {text: 'Case Profile', style: 'tableHeader',borderColor: ['#fff', '#fff', '#fff', '#fff'],border: [false, false, true, false]}, {text: 'Gross Value',alignment:'right', style: 'tableHeader',borderColor: ['#fff', '#fff', '#fff', '#fff'],border: [false, false, true, false]}, {text: 'Extra Discount',alignment:'right', style: 'tableHeader',borderColor: ['#fff', '#fff', '#fff', '#fff'],border: [false, false, true, false]}, {text: 'Net Value', alignment:'right',style: 'tableHeader',borderColor: ['#fff', '#fff', '#fff', '#fff'],border: [false, false, true, false]}],
                                    [{text:'1',margin:4,alignment:'left',borderColor: ['#fff', '#fff', '#fff', '#afb0b1'],border: [false, false, false, true]}
                                    ,{text:'Paris Aline ( Comprehensive )',alignment:'left',margin:4,borderColor: ['#fff', '#fff', '#fff', '#afb0b1'],border: [false, false, false, true]},
                                    {text:'9,374.00',margin:4,borderColor: ['#fff', '#fff', '#fff', '#afb0b1'],alignment:'right',border: [false, false, false, true]},
                                    {text:'6,374.00',margin:4,borderColor: ['#fff', '#fff', '#fff', '#afb0b1'],alignment:'right',border: [false, false, false, true]},{text:'3,000.00',margin:4,borderColor: ['#fff', '#fff', '#fff', '#afb0b1'],border: [false, false, false, true]}],
                                    [{text:"",border: [false, false, false, false]}
                                    ,{text:"",border: [false, false, false, false]},
                                    {text:"",border: [false, false, false, false]},
                                    {text:'Sub Total' ,margin:4,fillColor:"#fff",fontSize:10,borderColor: ['#fff', '#fff', '#fff', '#afb0b1'],alignment:'right',border: [false, false, false, false]},
                                   {text:'3,000.00',margin:4,fillColor:"#fff",fontSize:10,borderColor: ['#fff', '#fff', '#fff', '#afb0b1'],border: [false, false, false, false],alignment:'right'}],
                                   [{text:"",border: [false, false, false, false]}
                                    ,{text:"",border: [false, false, false, false]},
                                    {text:"",border: [false, false, false, false],blod:true},
                                    {text:'Total',style:"tableHeader2",margin:4,fontSize:10,borderColor: ['#fff', '#fff', '#fff', '#afb0b1'],alignment:'right',border: [false, false, false, false]},
                                   {text:'SAR3,000.00',style:"tableHeader2",margin:4,blod:true,fontSize:10,borderColor: ['#fff', '#fff', '#fff', '#afb0b1'],border: [false, false, false, false],alignment:'right'}],
                                   [{text:"",border: [false, false, false, false]}
                                    ,{text:"",border: [false, false, false, false]},
                                    {text:" ",fillColor:"#f2f5f7",border: [false, false, false, false]},
                                    {text:'Balance Due',style:"tableHeader2",margin:4,blod:true,fillColor:"#f2f5f7",fontSize:10,borderColor: ['#fff', '#fff', '#fff', '#afb0b1'],alignment:'right',border: [false, false, false, false]},
                                   {text:'SAR3,000.00',style:"tableHeader2",margin:4,blod:true,fillColor:"#f2f5f7",fontSize:10,borderColor: ['#fff', '#fff', '#fff', '#afb0b1'],border: [false, false, false, false],alignment:'right'}]
                                ],
                                layout: 'noBorders'
                            }
                        },
                    ],
                    footer:[
                        {
                            columns:[
                                        {
                                            svg:`<svg xmlns="http://www.w3.org/2000/svg" width="1857" height="100" viewBox="0 0 1857 100">
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
                            text:"If you have any questions don't hesitate to contact us on : support@parisaline.com ",
                            width: "200",
                            alignment:"center",
                            margin:[0,-150,0,0]
                        },
                        {
                            text:"Thanks for your business.",
                            width: "200",
                            alignment:"center",
                            margin:[0,0,0,0]
                        },
                    ],
                  styles:{
                    INVOICE:{
                        fontSize: 30,
                        bold: false,
                        alignment:'right',
                        margin:[0,0,0,0]
                      },
                      NumberInvoice:{
                        fontSize: 12,
                        bold: true,
                        alignment:'right',
                        margin:[0,0,0,0]
                      },
                      TParisAline:{
                        fontSize: 14,
                        bold: true,
                        alignment:'left',
                        margin:[0,10,0,0]
                      },
                      InvoiceDate:{
                        fontSize: 10,
                        bold: false,
                        alignment:'right',
                        margin:[0,10,0,0]
                      },
                      nameDR:{
                        fontSize: 14,
                        bold: true,
                        alignment:'left',
                        margin:[0,-65,0,0]
                      },
                      address:{
                        fontSize: 10,
                        bold: false,
                        alignment:'left',
                        margin:[0,3,0,0]
                      },
                      tableHeader:{
                        fillColor: '#383737',
                        color: '#fff',
                        fontSize: 10,
                        margin:5
                      },
                      tableHeader2:{
                        bold: true,
                      },
                      tableExample:{
                        margin:[0,10,0,0]
                      },
                      TotalPrice:{
                        fillColor: '#383737',
                        fontSize: 10,
                        bold: false,
                        alignment:'right',
                        margin:[0,10,0,0]
                      }
                  }
                };
                pdfMake.createPdf(PdfTemplete).getDataUrl().then((dataUrl) => {
                    targetElement.innerHTML="";
                    const iframe = document.createElement('iframe');
                    iframe.style.width="100%";
                    iframe.style.height="82vh";
                    iframe.src = dataUrl+"#toolbar=0";
                    targetElement.appendChild(iframe);
                }, err => {
                    console.error(err);
                });
            });

        }

        $scope.downloadInvoice=()=>{
            pdfMake.createPdf(PdfTemplete).download();
        }
    }

    ],
    Router:{
        Url:"/Invoices/:id",
        Templete="/Views/Invoices/Invoices.html",
        Render:[
            {link:"https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.3.0-beta.1/pdfmake.min.js",type:"JS"},
            {link:"https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.3.0-beta.1/vfs_fonts.min.js",type:"JS"},
        ],
        AUTH:true
    }
}
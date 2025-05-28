import { Component, OnInit,OnDestroy } from '@angular/core';
import { Language } from 'src/app/core/models/Language';
import { language_classifier } from 'src/app/core/models/language_classifier';
import { LanguageService } from 'src/app/core/services/language/language.service';
import { ToastrService } from 'ngx-toastr';
import { TransService } from 'src/app/core/services/translation/trans.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SenderrorService } from 'src/app/core/services/error/senderror.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {
  trans:any;
  Trans:Subscription;
  language:Language[];
  language_classifier:language_classifier[];
  breadCrumbItems: Array<{}>;
  //formLanguage
  formLanguage: FormGroup;
  submitted = false;
  error = '';
  loading = false;
  titleForm:String="ADD LANGUAGE";
  typeForm:Number=0;
  //formLanguage
  formLanguageclassifier: FormGroup;
  submittedLanguageclassifier = false;
  errorLanguageclassifier = '';
  loadingLanguageclassifier = false;
  titleFormLanguageclassifier:String="Add Languageclassifier";
  typeFormLanguageclassifier:Number=0
  langId:number=-1;

  langArray= [
    {"code":"ab","name":"Abkhaz","nativeName":"аҧсуа"},
    {"code":"aa","name":"Afar","nativeName":"Afaraf"},
    {"code":"af","name":"Afrikaans","nativeName":"Afrikaans"},
    {"code":"ak","name":"Akan","nativeName":"Akan"},
    {"code":"sq","name":"Albanian","nativeName":"Shqip"},
    {"code":"am","name":"Amharic","nativeName":"አማርኛ"},
    {"code":"ar","name":"Arabic","nativeName":"العربية"},
    {"code":"an","name":"Aragonese","nativeName":"Aragonés"},
    {"code":"hy","name":"Armenian","nativeName":"Հայերեն"},
    {"code":"as","name":"Assamese","nativeName":"অসমীয়া"},
    {"code":"av","name":"Avaric","nativeName":"авар мацӀ, магӀарул мацӀ"},
    {"code":"ae","name":"Avestan","nativeName":"avesta"},
    {"code":"ay","name":"Aymara","nativeName":"aymar aru"},
    {"code":"az","name":"Azerbaijani","nativeName":"azərbaycan dili"},
    {"code":"bm","name":"Bambara","nativeName":"bamanankan"},
    {"code":"ba","name":"Bashkir","nativeName":"башҡорт теле"},
    {"code":"eu","name":"Basque","nativeName":"euskara, euskera"},
    {"code":"be","name":"Belarusian","nativeName":"Беларуская"},
    {"code":"bn","name":"Bengali","nativeName":"বাংলা"},
    {"code":"bh","name":"Bihari","nativeName":"भोजपुरी"},
    {"code":"bi","name":"Bislama","nativeName":"Bislama"},
    {"code":"bs","name":"Bosnian","nativeName":"bosanski jezik"},
    {"code":"br","name":"Breton","nativeName":"brezhoneg"},
    {"code":"bg","name":"Bulgarian","nativeName":"български език"},
    {"code":"my","name":"Burmese","nativeName":"ဗမာစာ"},
    {"code":"ca","name":"Catalan; Valencian","nativeName":"Català"},
    {"code":"ch","name":"Chamorro","nativeName":"Chamoru"},
    {"code":"ce","name":"Chechen","nativeName":"нохчийн мотт"},
    {"code":"ny","name":"Chichewa; Chewa; Nyanja","nativeName":"chiCheŵa, chinyanja"},
    {"code":"zh","name":"Chinese","nativeName":"中文 (Zhōngwén), 汉语, 漢語"},
    {"code":"cv","name":"Chuvash","nativeName":"чӑваш чӗлхи"},
    {"code":"kw","name":"Cornish","nativeName":"Kernewek"},
    {"code":"co","name":"Corsican","nativeName":"corsu, lingua corsa"},
    {"code":"cr","name":"Cree","nativeName":"ᓀᐦᐃᔭᐍᐏᐣ"},
    {"code":"hr","name":"Croatian","nativeName":"hrvatski"},
    {"code":"cs","name":"Czech","nativeName":"česky, čeština"},
    {"code":"da","name":"Danish","nativeName":"dansk"},
    {"code":"dv","name":"Divehi; Dhivehi; Maldivian;","nativeName":"ދިވެހި"},
    {"code":"nl","name":"Dutch","nativeName":"Nederlands, Vlaams"},
    {"code":"en","name":"English","nativeName":"English"},
    {"code":"eo","name":"Esperanto","nativeName":"Esperanto"},
    {"code":"et","name":"Estonian","nativeName":"eesti, eesti keel"},
    {"code":"ee","name":"Ewe","nativeName":"Eʋegbe"},
    {"code":"fo","name":"Faroese","nativeName":"føroyskt"},
    {"code":"fj","name":"Fijian","nativeName":"vosa Vakaviti"},
    {"code":"fi","name":"Finnish","nativeName":"suomi, suomen kieli"},
    {"code":"fr","name":"French","nativeName":"français, langue française"},
    {"code":"ff","name":"Fula; Fulah; Pulaar; Pular","nativeName":"Fulfulde, Pulaar, Pular"},
    {"code":"gl","name":"Galician","nativeName":"Galego"},
    {"code":"ka","name":"Georgian","nativeName":"ქართული"},
    {"code":"de","name":"German","nativeName":"Deutsch"},
    {"code":"el","name":"Greek, Modern","nativeName":"Ελληνικά"},
    {"code":"gn","name":"Guaraní","nativeName":"Avañeẽ"},
    {"code":"gu","name":"Gujarati","nativeName":"ગુજરાતી"},
    {"code":"ht","name":"Haitian; Haitian Creole","nativeName":"Kreyòl ayisyen"},
    {"code":"ha","name":"Hausa","nativeName":"Hausa, هَوُسَ"},
    {"code":"he","name":"Hebrew (modern)","nativeName":"עברית"},
    {"code":"hz","name":"Herero","nativeName":"Otjiherero"},
    {"code":"hi","name":"Hindi","nativeName":"हिन्दी, हिंदी"},
    {"code":"ho","name":"Hiri Motu","nativeName":"Hiri Motu"},
    {"code":"hu","name":"Hungarian","nativeName":"Magyar"},
    {"code":"ia","name":"Interlingua","nativeName":"Interlingua"},
    {"code":"id","name":"Indonesian","nativeName":"Bahasa Indonesia"},
    {"code":"ie","name":"Interlingue","nativeName":"Originally called Occidental; then Interlingue after WWII"},
    {"code":"ga","name":"Irish","nativeName":"Gaeilge"},
    {"code":"ig","name":"Igbo","nativeName":"Asụsụ Igbo"},
    {"code":"ik","name":"Inupiaq","nativeName":"Iñupiaq, Iñupiatun"},
    {"code":"io","name":"Ido","nativeName":"Ido"},
    {"code":"is","name":"Icelandic","nativeName":"Íslenska"},
    {"code":"it","name":"Italian","nativeName":"Italiano"},
    {"code":"iu","name":"Inuktitut","nativeName":"ᐃᓄᒃᑎᑐᑦ"},
    {"code":"ja","name":"Japanese","nativeName":"日本語 (にほんご／にっぽんご)"},
    {"code":"jv","name":"Javanese","nativeName":"basa Jawa"},
    {"code":"kl","name":"Kalaallisut, Greenlandic","nativeName":"kalaallisut, kalaallit oqaasii"},
    {"code":"kn","name":"Kannada","nativeName":"ಕನ್ನಡ"},
    {"code":"kr","name":"Kanuri","nativeName":"Kanuri"},
    {"code":"ks","name":"Kashmiri","nativeName":"कश्मीरी, كشميري‎"},
    {"code":"kk","name":"Kazakh","nativeName":"Қазақ тілі"},
    {"code":"km","name":"Khmer","nativeName":"ភាសាខ្មែរ"},
    {"code":"ki","name":"Kikuyu, Gikuyu","nativeName":"Gĩkũyũ"},
    {"code":"rw","name":"Kinyarwanda","nativeName":"Ikinyarwanda"},
    {"code":"ky","name":"Kirghiz, Kyrgyz","nativeName":"кыргыз тили"},
    {"code":"kv","name":"Komi","nativeName":"коми кыв"},
    {"code":"kg","name":"Kongo","nativeName":"KiKongo"},
    {"code":"ko","name":"Korean","nativeName":"한국어 (韓國語), 조선말 (朝鮮語)"},
    {"code":"ku","name":"Kurdish","nativeName":"Kurdî, كوردی‎"},
    {"code":"kj","name":"Kwanyama, Kuanyama","nativeName":"Kuanyama"},
    {"code":"la","name":"Latin","nativeName":"latine, lingua latina"},
    {"code":"lb","name":"Luxembourgish, Letzeburgesch","nativeName":"Lëtzebuergesch"},
    {"code":"lg","name":"Luganda","nativeName":"Luganda"},
    {"code":"li","name":"Limburgish, Limburgan, Limburger","nativeName":"Limburgs"},
    {"code":"ln","name":"Lingala","nativeName":"Lingála"},
    {"code":"lo","name":"Lao","nativeName":"ພາສາລາວ"},
    {"code":"lt","name":"Lithuanian","nativeName":"lietuvių kalba"},
    {"code":"lu","name":"Luba-Katanga","nativeName":""},
    {"code":"lv","name":"Latvian","nativeName":"latviešu valoda"},
    {"code":"gv","name":"Manx","nativeName":"Gaelg, Gailck"},
    {"code":"mk","name":"Macedonian","nativeName":"македонски јазик"},
    {"code":"mg","name":"Malagasy","nativeName":"Malagasy fiteny"},
    {"code":"ms","name":"Malay","nativeName":"bahasa Melayu, بهاس ملايو‎"},
    {"code":"ml","name":"Malayalam","nativeName":"മലയാളം"},
    {"code":"mt","name":"Maltese","nativeName":"Malti"},
    {"code":"mi","name":"Māori","nativeName":"te reo Māori"},
    {"code":"mr","name":"Marathi (Marāṭhī)","nativeName":"मराठी"},
    {"code":"mh","name":"Marshallese","nativeName":"Kajin M̧ajeļ"},
    {"code":"mn","name":"Mongolian","nativeName":"монгол"},
    {"code":"na","name":"Nauru","nativeName":"Ekakairũ Naoero"},
    {"code":"nv","name":"Navajo, Navaho","nativeName":"Diné bizaad, Dinékʼehǰí"},
    {"code":"nb","name":"Norwegian Bokmål","nativeName":"Norsk bokmål"},
    {"code":"nd","name":"North Ndebele","nativeName":"isiNdebele"},
    {"code":"ne","name":"Nepali","nativeName":"नेपाली"},
    {"code":"ng","name":"Ndonga","nativeName":"Owambo"},
    {"code":"nn","name":"Norwegian Nynorsk","nativeName":"Norsk nynorsk"},
    {"code":"no","name":"Norwegian","nativeName":"Norsk"},
    {"code":"ii","name":"Nuosu","nativeName":"ꆈꌠ꒿ Nuosuhxop"},
    {"code":"nr","name":"South Ndebele","nativeName":"isiNdebele"},
    {"code":"oc","name":"Occitan","nativeName":"Occitan"},
    {"code":"oj","name":"Ojibwe, Ojibwa","nativeName":"ᐊᓂᔑᓈᐯᒧᐎᓐ"},
    {"code":"cu","name":"Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic","nativeName":"ѩзыкъ словѣньскъ"},
    {"code":"om","name":"Oromo","nativeName":"Afaan Oromoo"},
    {"code":"or","name":"Oriya","nativeName":"ଓଡ଼ିଆ"},
    {"code":"os","name":"Ossetian, Ossetic","nativeName":"ирон æвзаг"},
    {"code":"pa","name":"Panjabi, Punjabi","nativeName":"ਪੰਜਾਬੀ, پنجابی‎"},
    {"code":"pi","name":"Pāli","nativeName":"पाऴि"},
    {"code":"fa","name":"Persian","nativeName":"فارسی"},
    {"code":"pl","name":"Polish","nativeName":"polski"},
    {"code":"ps","name":"Pashto, Pushto","nativeName":"پښتو"},
    {"code":"pt","name":"Portuguese","nativeName":"Português"},
    {"code":"qu","name":"Quechua","nativeName":"Runa Simi, Kichwa"},
    {"code":"rm","name":"Romansh","nativeName":"rumantsch grischun"},
    {"code":"rn","name":"Kirundi","nativeName":"kiRundi"},
    {"code":"ro","name":"Romanian, Moldavian, Moldovan","nativeName":"română"},
    {"code":"ru","name":"Russian","nativeName":"русский язык"},
    {"code":"sa","name":"Sanskrit (Saṁskṛta)","nativeName":"संस्कृतम्"},
    {"code":"sc","name":"Sardinian","nativeName":"sardu"},
    {"code":"sd","name":"Sindhi","nativeName":"सिन्धी, سنڌي، سندھی‎"},
    {"code":"se","name":"Northern Sami","nativeName":"Davvisámegiella"},
    {"code":"sm","name":"Samoan","nativeName":"gagana faa Samoa"},
    {"code":"sg","name":"Sango","nativeName":"yângâ tî sängö"},
    {"code":"sr","name":"Serbian","nativeName":"српски језик"},
    {"code":"gd","name":"Scottish Gaelic; Gaelic","nativeName":"Gàidhlig"},
    {"code":"sn","name":"Shona","nativeName":"chiShona"},
    {"code":"si","name":"Sinhala, Sinhalese","nativeName":"සිංහල"},
    {"code":"sk","name":"Slovak","nativeName":"slovenčina"},
    {"code":"sl","name":"Slovene","nativeName":"slovenščina"},
    {"code":"so","name":"Somali","nativeName":"Soomaaliga, af Soomaali"},
    {"code":"st","name":"Southern Sotho","nativeName":"Sesotho"},
    {"code":"es","name":"Spanish; Castilian","nativeName":"español, castellano"},
    {"code":"su","name":"Sundanese","nativeName":"Basa Sunda"},
    {"code":"sw","name":"Swahili","nativeName":"Kiswahili"},
    {"code":"ss","name":"Swati","nativeName":"SiSwati"},
    {"code":"sv","name":"Swedish","nativeName":"svenska"},
    {"code":"ta","name":"Tamil","nativeName":"தமிழ்"},
    {"code":"te","name":"Telugu","nativeName":"తెలుగు"},
    {"code":"tg","name":"Tajik","nativeName":"тоҷикӣ, toğikī, تاجیکی‎"},
    {"code":"th","name":"Thai","nativeName":"ไทย"},
    {"code":"ti","name":"Tigrinya","nativeName":"ትግርኛ"},
    {"code":"bo","name":"Tibetan Standard, Tibetan, Central","nativeName":"བོད་ཡིག"},
    {"code":"tk","name":"Turkmen","nativeName":"Türkmen, Түркмен"},
    {"code":"tl","name":"Tagalog","nativeName":"Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"},
    {"code":"tn","name":"Tswana","nativeName":"Setswana"},
    {"code":"to","name":"Tonga (Tonga Islands)","nativeName":"faka Tonga"},
    {"code":"tr","name":"Turkish","nativeName":"Türkçe"},
    {"code":"ts","name":"Tsonga","nativeName":"Xitsonga"},
    {"code":"tt","name":"Tatar","nativeName":"татарча, tatarça, تاتارچا‎"},
    {"code":"tw","name":"Twi","nativeName":"Twi"},
    {"code":"ty","name":"Tahitian","nativeName":"Reo Tahiti"},
    {"code":"ug","name":"Uighur, Uyghur","nativeName":"Uyƣurqə, ئۇيغۇرچە‎"},
    {"code":"uk","name":"Ukrainian","nativeName":"українська"},
    {"code":"ur","name":"Urdu","nativeName":"اردو"},
    {"code":"uz","name":"Uzbek","nativeName":"zbek, Ўзбек, أۇزبېك‎"},
    {"code":"ve","name":"Venda","nativeName":"Tshivenḓa"},
    {"code":"vi","name":"Vietnamese","nativeName":"Tiếng Việt"},
    {"code":"vo","name":"Volapük","nativeName":"Volapük"},
    {"code":"wa","name":"Walloon","nativeName":"Walon"},
    {"code":"cy","name":"Welsh","nativeName":"Cymraeg"},
    {"code":"wo","name":"Wolof","nativeName":"Wollof"},
    {"code":"fy","name":"Western Frisian","nativeName":"Frysk"},
    {"code":"xh","name":"Xhosa","nativeName":"isiXhosa"},
    {"code":"yi","name":"Yiddish","nativeName":"ייִדיש"},
    {"code":"yo","name":"Yoruba","nativeName":"Yorùbá"},
    {"code":"za","name":"Zhuang, Chuang","nativeName":"Saɯ cueŋƅ, Saw cuengh"}
  ];
  constructor(private formBuilder:FormBuilder,
    private s_Error:SenderrorService,private modalService: NgbModal,private lang:LanguageService,private toastr: ToastrService,private transs:TransService) {
      this.Trans=transs.trans.subscribe(res=>{
        this.trans=res.key;
      });
   }

  ngOnInit() {
    //set Validators formLanguage
    this.formLanguage = this.formBuilder.group({
      langCode: ['', Validators.required],
      direction: ['', Validators.required],
    });
    //set Validators formLanguage
    this.formLanguageclassifier = this.formBuilder.group({
      langName: ['', Validators.required],
      langCode: ['', Validators.required],
    });
    //set title root
    this.breadCrumbItems = [{ label: 'SETTINGS', path: '/' }, { label: 'LANGUAGES', path: '/', active: true }];
    this.getAllLanguage();
    this.formLanguage.addControl('id', new FormControl(-1));

    this.formLanguageclassifier.addControl('id', new FormControl(-1));
    this.formLanguageclassifier.addControl('langId',new FormControl(""));
  }
   
  ngOnDestroy() {
    this.Trans.unsubscribe();
  }
//Language
  getAllLanguage(){
    this.lang.getlanguage().subscribe(res=>{
      this.language=res;
    });
    this.lang.getLanguageAll();
  }
  onChangecheck($event,id:number)
  {
    if($event)
    {
      this.lang.deactivate_or_activate(id,1).subscribe(res=>{
        this.toastr.success(this.trans.Language.The_language_has_been_activated, "successfull" ,{
          timeOut :  3000
        });
      })
    }
    else{
      this.lang.deactivate_or_activate(id,0).subscribe(res=>{
        this.toastr.warning(this.trans.Language.The_language_has_been_deactivated, "successfull" ,{
          timeOut :  3000
        });
      })
    }
  }
  status(status:number){
    if(status==0)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  onChange(C:string){
    if(C=="C" )
    {
      if(this.formLanguageclassifier.get('langCode').value.length >= 2)
      {
        this.formLanguageclassifier.get('langCode').setValue(this.formLanguageclassifier.get('langCode').value[0].toString()+
        this.formLanguageclassifier.get('langCode').value[1].toString()) ;
       
      }
      this.formLanguageclassifier.get('langCode').setValue(this.formLanguageclassifier.get('langCode').value.toUpperCase());
    }
    else
    {
      if(this.formLanguage.get('langCode').value.length >= 2)
      {
        this.formLanguage.get('langCode').setValue(this.formLanguage.get('langCode').value[0].toString()+
        this.formLanguage.get('langCode').value[1].toString()) ;
       
      }
      this.formLanguage.get('langCode').setValue(this.formLanguage.get('langCode').value.toUpperCase());
    }

  }
  onKeydown($event,C:string){
    if(this.formLanguageclassifier.get('langCode').value !="" && this.formLanguageclassifier.get('langCode').value !=null)
    {
      if(C=="C")
      {
        if(this.formLanguageclassifier.get('langCode').value.length >= 2)
        {
          if($event.key!='Backspace')
          {
            $event.preventDefault();
          }
          
        }
      }
      else
      {
        if(this.formLanguage.get('langCode').value.length >= 2)
        {
          if($event.key!='Backspace')
          {
            $event.preventDefault();
          }
          
        }
      }
    }


  }
  isValidator(){
    let langCode:string=this.formLanguage.get('langCode').value;
    if((this.language.find(x=>x.langCode==langCode)|| langCode.length > 2 || langCode.length < 2) && this.typeForm==0 )
    {
      return false;
    }
    else
    {
      return true;
    }
  }
  
  addLanguage(content)
  {
    this.enableController(null,true);
    this.typeForm=0;
    this.titleForm="ADD LANGUAGE";
    this.formLanguage.reset();
    this.modalService.open(content,{ backdrop: 'static' });
    this.formLanguage.get('direction').setValue("LTR");
  }

  putValueController(id:Number){
    this.formLanguage.get('id').setValue(this.language.find(x=>x.id==id).id);
    this.formLanguage.get('langCode').setValue(this.language.find(x=>x.id==id).langCode);
    this.formLanguage.get('direction').setValue(this.language.find(x=>x.id==id).direction);
  }
  deleteLanguage(content,id:number){
    
    this.putValueController(id);
    this.disableController(null,true);
    this.typeForm=2;
    this.titleForm="DELETE LANGUAGE";
    this.modalService.open(content,{ backdrop: 'static' });
  }
  submitLanguage(param:[]){
    if(this.typeForm==0)
    {
      return this.lang.create(param);
    }
    else if(this.typeForm==2)
    {
      return this.lang.delete(param);
    }
  }

  disableController(namecontroller:string="",All:boolean=false)
  {
    if(All)
    {
      this.formLanguage.disable({onlySelf:true});

    }
    else
    {
      this.formLanguage.get(namecontroller).disable({onlySelf:true});
    }
   
  }
  enableController(namecontroller:string="",All:boolean=false)
  {
    if(All)
    {
      this.formLanguage.enable({onlySelf:true});
    }
    else
    {
      this.formLanguage.get(namecontroller).enable({onlySelf:true});
    }
  }
  onSubmitLanguage(){
    if(!this.isValidator())
    {
      return;
    }
    this.loading = true;
    this.submitLanguage(this.formLanguage.value).subscribe(res=>{
      if(res.message==2000) //2000 it means this number is added successfully
      {
        this.toastr.success(this.trans.Language.lang_added_successfully, "successfull" ,{
          timeOut :  3000
        });
      }
      else if(res.message==2002) //2002 it means this number is deleted successfully
      {
        this.toastr.success(this.trans.Language.lang_deleted_successfully, "successfull" ,{
          timeOut :  3000
        });
      }
      this.loading = false;
      this.lang.getLanguageAll();
      this.submitted = false;
      this.formLanguage.reset();
      this.modalService.dismissAll();
    },(err)=>{

      if(err.message==1001)
      {
        this.toastr.error(this.trans.users.error_1001, "error" ,{
          timeOut :  3000
        });
        this.submitted = false;
      }
      else if (err.message==55555){
        this.submitted = false;
        this.toastr.error(this.trans.public.error_55555, "error" ,{
          timeOut :  3000
        });
        
        this.s_Error.sendErorr(err.message,err.error);
      }
      this.loading = false;
      this.submitted = false;
    });
  }
  
//Language classifier 
  geLanguage_classifier(id:number){
    this.lang.getlanguage_classifierById(id).subscribe(res=>{
      this.language_classifier=res;
      this.langId=id;
    });
  }
  isValidatorLanguage_classifier(){
    let langCode:string=this.formLanguageclassifier.get('langCode').value;
    if(this.language_classifier.find(x=>x.langCode==langCode) || (langCode.length > 2 || langCode.length < 2))
    {
      if(this.typeFormLanguageclassifier!=2)
      {
        return false;
      }
      else
      {
        return true;
      }
      
    }
    else
    {
      return true;
    }
  }
  addLanguage_classifier(content)
  {
    this.enableController(null,true);
    this.typeFormLanguageclassifier=0;
    this.titleFormLanguageclassifier="ADD LANGUAGE";
    this.formLanguageclassifier.reset();
    this.formLanguageclassifier.get("langName").enable({onlySelf:true});
    this.formLanguageclassifier.get("langCode").enable({onlySelf:true});
    this.modalService.open(content,{ backdrop: 'static' });
  }
  deleteLanguage_classifie(content,id:number){
    
    this.formLanguageclassifier.get("langName").setValue(this.language_classifier.find(x=>x.id==id).langName);
    this.formLanguageclassifier.get("langCode").setValue(this.language_classifier.find(x=>x.id==id).langCode);
    this.formLanguageclassifier.get("id").setValue(id);
    this.formLanguageclassifier.get("langName").disable({onlySelf:true});
    this.formLanguageclassifier.get("langCode").disable({onlySelf:true});
    this.disableController(null,true);
    this.typeFormLanguageclassifier=2;
    this.titleFormLanguageclassifier=this.trans.language_classifier.TitleForm_delete_Language;
    this.modalService.open(content,{ backdrop: 'static' });
  }
  submitLanguageclassifier(param:[]){
    if(this.typeFormLanguageclassifier==0)
    {
      return this.lang.language_classifierCreate(param);
    }
    else if(this.typeFormLanguageclassifier==1)
    {
      return this.lang.language_classifierUpdate(param);
    }
    else if(this.typeFormLanguageclassifier==2)
    {
      return this.lang.language_classifierDelete(param);
    }
  }
  onSubmitLanguageclassifier(){
    this.formLanguageclassifier.get("langId").setValue(this.langId);
    this.loadingLanguageclassifier = true;
    if(!this.isValidatorLanguage_classifier())
    {
      this.toastr.warning("thie Name Exists", "Exists" ,{
        timeOut :  3000
      });
      return;
    }
    this.submitLanguageclassifier(this.formLanguageclassifier.value).subscribe(res=>{
      if(res.message==2000) //2000 it means this number is added successfully
      {
        this.toastr.success(this.trans.language_classifier.lang_added_successfully, "successfull" ,{
          timeOut :  3000
        });
      }
      else if(res.message==2002) //2002 it means this number is deleted successfully
      {
        this.toastr.success(this.trans.language_classifier.lang_deleted_successfully, "successfull" ,{
          timeOut :  3000
        });
      }
      this.loadingLanguageclassifier = false;
      this.geLanguage_classifier(this.langId);
      this.submittedLanguageclassifier = false;
      this.formLanguageclassifier.reset();
      this.modalService.dismissAll();
    },(err)=>{
      if(err.message==1001)
      {
        this.toastr.error(this.trans.users.error_1001, "error" ,{
          timeOut :  3000
        });
        this.submitted = false;
      }
      else if (err.message==55555){
        this.submittedLanguageclassifier = false;
        this.toastr.error(this.trans.public.error_55555, "error" ,{
          timeOut :  3000
        });
        
        this.s_Error.sendErorr(err.message,err.error);
      }
      this.loadingLanguageclassifier = false;
      this.submittedLanguageclassifier = false;
    });
  }
}

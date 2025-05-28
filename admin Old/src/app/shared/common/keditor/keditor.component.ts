import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

declare var CKEDITOR:any;
@Component({
  selector: 'app-keditor',
  templateUrl: './keditor.component.html',
  styleUrls: ['./keditor.component.scss']
})
export class KeditorComponent implements OnInit {

  isLoading:boolean=true;
  @Input("IDEDIT") IDEDIT:string;
  @Input("VALUEEDIT") VALUEEDIT:string;
  @Output() selectImage: EventEmitter<any> = new EventEmitter();
  @Output() changeValue: EventEmitter<any> = new EventEmitter();
  @Output() getEditor: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    var div=document.createElement('div');
    div.style.width="100%";
    div.id=this.IDEDIT;
   setTimeout(() => {
     let element=document.querySelectorAll("app-keditor");
     for(var i=0;i<element.length;i++)
     {
       if(element[i].id==this.IDEDIT)
       {
        element[i].appendChild(div);
       var eddit= CKEDITOR.replace( div, {
        language:'en',
          toolbar: [
            { name: 'document', items: [ 'Source', '-', 'Save','ExportPdf', 'Preview', 'Print', '-', 'Templates' ] },
            { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
            { name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
            { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
            '/',
            { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
            { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
            { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
            { name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
            '/',
            { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
            { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
            { name: 'tools', items: [ 'Maximize', 'ShowBlocks','imageKiven' ] }
             ],
          on: {
            instanceReady: ( evt )=> {
              this.isLoading=false;
            },
            blur: ( evt )=> {
              this.changeValue.emit({id:this.IDEDIT,value:evt.editor.getData()});
              },
          }
       } );
       eddit.ui.addButton( 'imageKiven', {
        icon: 'image',
        command:'selectImage'
       } );
       eddit.addCommand('selectImage', {
        exec : (editor)=> {
          this.selectImage.emit(editor);
        }
       });
       eddit.setData(this.VALUEEDIT);
       this.getEditor.emit(eddit);

       }
     }
   }, 1000);

  }
  
  uploadFile(editor){

    alert("asdas");
  }

}
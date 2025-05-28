import { Component, Input, AfterViewInit, ElementRef, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import * as monaco from 'monaco-editor';
@Component({
  selector: 'app-codeeditor',
  templateUrl: './codeeditor.component.html',
  styleUrls: ['./codeeditor.component.scss']
})
export class CodeeditorComponent implements OnInit {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
  @Output() codeChanged = new EventEmitter<string>();
  @Input() initialCode: string = '';
  @Input() typeCode: string = '';
  editor: monaco.editor.IStandaloneCodeEditor | undefined;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
      value: this.initialCode,
      language: this.typeCode,
      theme: 'vs-dark'
    });

    this.editor.onDidChangeModelContent(() => {
      const value = this.editor.getValue();
      this.codeChanged.emit(value);
    });
  }

}

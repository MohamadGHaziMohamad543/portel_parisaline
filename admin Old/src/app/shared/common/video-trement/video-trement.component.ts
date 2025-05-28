import { Component, Input, OnInit } from '@angular/core';
declare var $:any
declare var mainFunction:any
@Component({
  selector: 'app-video-trement',
  templateUrl: './video-trement.component.html',
  styleUrls: ['./video-trement.component.scss']
})
export class VideoTrementComponent implements OnInit {

  constructor() { }

  @Input() srcVideo:string;
  ngOnInit() {
    $(function(){
      var $refreshButton = $('#refresh');
      var $results = $('#css_result');
      
      function refresh(){
        var css = $('style.cp-pen-styles').text();
        $results.html(css);
      }
    
      refresh();
      $refreshButton.click(refresh);
      
      // Select all the contents when clicked
      $results.click(function(){
        $(this).select();
      });
    });
    
  }
}

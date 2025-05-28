import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable } from 'rxjs';
declare var StlViewer: any;
@Injectable({
  providedIn: 'root'
})
export class StlViewService {

  stlView:any;
  fileExsite:boolean=false;
  prgrass:HTMLProgressElement;
  animated=false;
  stlReady=false;
  status: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }

  public setStlView(elementDiv:HTMLDivElement,prgrass:HTMLProgressElement){
    if(this.stlReady)
    {

    }
    else{
      this.prgrass=prgrass;
      this.stlView=new StlViewer
      (
        elementDiv,
          {
            loading_progress_callback:this.load_prog,
            all_loaded_callback:()=>{
              this.status.next(true);
            },
              models: []
          }
      );
      this.stlReady=true;
    }

  }

  public setFileView(URL:string){
    this.stlView.add_model({id:1,filename:URL,pacity:0.2, z:20, color:"#7a7a7a"});
    this.fileExsite=true;
    this.status.next(false);
    return this.status;
  }

  load_prog(load_status, load_session)
    {
        var loaded=0;
        var total=0;

        //go over all models that are/were loaded
        Object.keys(load_status).forEach(function(model_id)
        {
            if (load_status[model_id].load_session==load_session) //need to make sure we're on the last loading session (not counting previous loaded models)
            {
                loaded+=load_status[model_id].loaded;
                total+=load_status[model_id].total;

                //set the relevant model's progress bar
                console.log(load_status[model_id].loaded/load_status[model_id].total);
                (<HTMLProgressElement>document.getElementById("pbtotal")).value=load_status[model_id].loaded/load_status[model_id].total;
            }
        });

        //set total progress bar
       // (<HTMLProgressElement>document.getElementById("pbtotal")).value=loaded/total;
    }
    StopAnmtion(){
      if(this.animated)
      {
        this.stlView.animate_model(1, {delta:null} );
        this.animated=false;
      }
      else{
        this.stlView.animate_model(1, {delta:{rotationx:1, msec:1000, loop:true}} );
        this.animated=true;
        
      }
     
    }
    clearStl(){
      this.stlView.remove_model(1);
    }

}

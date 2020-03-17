import { Component, OnInit,OnDestroy} from '@angular/core';
import {BlogPost} from '../BlogPost';
import {PostService} from '../post.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit,OnDestroy {

  post:BlogPost;
  querySub:any;
  constructor(private postServe: PostService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe((params)=>{
      
      this.postServe.getPostById(params['id']).subscribe((response)=>this.post=response);
    });
  }

  ngOnDestroy(){
    if(this.querySub)this.querySub.unsubscribe();
  }

}

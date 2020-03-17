import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogPost } from '../BlogPost';
import {PostService} from '../post.service';
import {ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

  blogPosts:Array<BlogPost>;
  page:number=1;
  tag:string=null;
  category:string=null;
  querySub:any;
  constructor(private post:PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(params=>{
      if(params.tag){
        this.tag = params.tag;
        this.category =null;
      }
      else{
        this.tag=null;
      }

      if (params['category']) {
        this.category = params['category']; 
        this.tag = null;
      } else {
        this.category = null;
      }
        this.getPage(+params['page']||1);
    });
  }
  getPage(num):void{
      this.post.getPosts(num,this.tag,this.category).subscribe(response=>{
        if(response.length>0){
          this.blogPosts=response;
          this.page=num;
          window.scrollTo(0,0);
        }
      });
  }

  ngOnDestroy(){
    if(this.querySub)this.querySub.unsubscribe();
  }

}

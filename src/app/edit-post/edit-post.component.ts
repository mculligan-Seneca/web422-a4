import { Component, OnInit } from '@angular/core';
import{PostService} from '../post.service';
import {Router, ActivatedRoute} from '@angular/router';
import {BlogPost} from '../BlogPost';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  blogPost:BlogPost;
  tags:string;
  constructor(private postServe: PostService, private route:Router,private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.postServe.getPostById(this.activeRoute.snapshot.params['id']).subscribe((response)=>{
      this.blogPost=response;
      this.tags = this.blogPost.tags.toString();
    });

 
  }
  formSubmit() {
      this.blogPost.tags = this.tags.split(',').map(tag=>tag.trim());
      this.postServe.updatePostById(this.blogPost._id,this.blogPost).subscribe((response)=>this.route.navigate(['admin']));
  }

  deletePost(){
    this.postServe.deletePostById(this.blogPost._id).subscribe((response)=>this.route.navigate(['admin']));
  }

}

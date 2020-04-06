import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from './BlogPost';
import { HttpClient } from '@angular/common/http';

const perPage: number = 6;

@Injectable({
  providedIn: 'root'
})


export class PostService {
  
  constructor(private http: HttpClient) { }
  //never call with'#'
  getPosts(page:number,tag:string,category:string):Observable<Array<BlogPost>>{
    let paramsString = (tag==null?"":"&tag="+tag)+(category==null?"":"&category="+category);
    return this.http.get<Array<BlogPost>>(`https://calm-dusk-31893.herokuapp.com/api/posts?page=${page}&perPage=${perPage}`+paramsString);
  }
 
  getPostById(id:string):Observable<BlogPost>{
    return this.http.get<BlogPost>(`https://calm-dusk-31893.herokuapp.com/api/posts/${id}`);
  }


  getCategories():Observable<{cat: string, num: number}[]>{
    return this.http.get<{ cat: string, num: number }[]>("https://calm-dusk-31893.herokuapp.com/api/categories");
  }

  getTags():Observable<string[]>{
    return this.http.get<string[]>("https://calm-dusk-31893.herokuapp.com/api/tags");
  }


  getAllPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`https://calm-dusk-31893.herokuapp.com/api/posts?page=1&perPage=${Number.MAX_SAFE_INTEGER}`);
  }

  newPost(data: BlogPost): Observable<any> {
    return this.http.post<any>("https://calm-dusk-31893.herokuapp.com/api/posts", data);
  }

  updatePostById(id: string, data: BlogPost): Observable<any> {
    return this.http.put<any>(`https://calm-dusk-31893.herokuapp.com/api/posts/${id}`, data);
  }

  deletePostById(id: string): Observable<any> {
    return this.http.delete<any>(`https://calm-dusk-31893.herokuapp.com/api/posts/${id}`);
  }

}

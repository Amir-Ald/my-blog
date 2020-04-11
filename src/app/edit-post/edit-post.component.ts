import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  blogPost: BlogPost;
  tags: string;
  private post;

  constructor(private postsrvc: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.post = this.postsrvc.getPostByID(this.route.snapshot.params['id']).subscribe(data => {
        this.blogPost = data; 
        this.tags = data.tags.toString();
      })
  }
  ngOnDestroy() {
    if (this.post) this.post.unsubscribe();
  }
  formSubmit(): void {
    this.blogPost.tags = this.tags.split(',').map(tag => tag.trim());
    this.postsrvc.updatePostById(this.blogPost._id, this.blogPost).subscribe( () => this.router.navigate(['/admin']));
  } 
  deletePost(id) {
    this.postsrvc.deletePostById(id).subscribe( () => this.router.navigate(['/admin']));
  }

}

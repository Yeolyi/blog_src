ssh -i "~/Developer/blog.pem" ubuntu@ec2-43-200-204-95.ap-northeast-2.compute.amazonaws.com -t 'cd blog_src; git fetch; git rebase'

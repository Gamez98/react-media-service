drop database if exists netflix;

create database if not exists netflix;

use netflix;

create table users (
   id int primary key auto_increment,
   name varchar(45) not null,
   lname varchar(45) not null,
   age int not null,
   username varchar(45) not null,
   email varchar(45) not null,
   password varchar(45) not null,
   country varchar(45) not null
);

create table movies (
   id int primary key auto_increment,
   title varchar(45) not null,
   year int not null,
   rate double not null,
   category varchar(45) not null,
   rated varchar(10) not null,
   country varchar(45) not null,
   actors varchar(45) not null,
   image_path varchar(250) not null,
   video_path varchar(250) not null,
   video_type varchar(10) not null
);

insert into users values (1 , 'alan', 'gamez',90 , 'gamez98', 'gamez@hotmail.com' ,'test' ,'canada'),
(2 , 'daniela' , 'gomez' ,21 , 'dani', 'daniela@hotmail.com', 'qwertyuiop' , 'mexico' ),
(3 , 'pedro', 'fernandez',22 , 'pedro', 'ped@hotmail.com' , 'pinedios' , 'usa' ),
(4 , 'mariana' , 'jimenez',25 , 'marianita', 'majo@hotmail.com' , 'qwertyuiop' , 'mexico'),
(6 , 'eduardo', 'regalado' ,35 , 'regalado98' ,'regalado98@hotmail.com' , 'test' , 'spain'),
(7 , 'sergio', 'martinez' ,28 , 'sergio91' ,'sergio@hotmail.com' , 'sergio' , 'mexico');

insert into movies values 
(1, 'american sniper' , 2014, 7.7, 'action', 'r', 'usa', 'bradley cooper', 'https://m.media-amazon.com/images/M/MV5BMTkxNzI3ODI4Nl5BMl5BanBnXkFtZTgwMjkwMjY4MjE@._V1_UX182_CR0,0,182,268_AL_.jpg' ,'','movie'),
(2, 'el protegido' , 2000, 6.7, 'thriller', 'b', 'usa', 'bruce willis', 'https://www.cineyliteratura.cl/wp-content/uploads/2018/06/El-protegido-777x437.jpg' ,'','movie'),
(3, 'forest gump' , 1994, 8.9, 'drama', 'b', 'usa', 'tom hanks', 'http://img.europapress.es/fotoweb/fotonoticia_20161127140624_800.jpg' ,'','movie'),
(4, 'el dictador' , 2012, 7.7, 'comedy', 'b', 'usa', 'sacha baron', 'http://blogdeonda.com/wp-content/uploads/2012/09/film-review-the-dictator-002.jpg' ,'','movie'),
(5, 'lone survivor' , 2013, 8.1 , 'action', 'r', 'usa', 'mark wahlberg', 'https://pmcvariety.files.wordpress.com/2013/12/5685_fpf_00265r.jpg?w=1000' ,'','movie'),
(6, 'shooter' , 2007, 7.4, 'action', 'r', 'usa', 'mark wahlberg', 'https://www.usanetwork.com/sites/usanetwork/files/styles/769x434/public/2016/12/shooter_s1_e6_bob_13_1920x1080.jpg?itok=SN7LwAGd' ,'','movie'),
(7, 'ted' , 2012, 7.1, 'comedy', 'd', 'usa', 'mark wahlberg', 'https://www.rockandpop.cl/wp-content/uploads/2015/06/maxresdefault-1.jpg' ,'','movie'),
(8, 'jobs' , 2013, 7.5, 'drama', 'd', 'usa', 'ashton kutcher', 'https://i.amz.mshcdn.com/-_Jg36lbFYMcl80Fc_krheJ3MtY=/950x534/filters:quality(90)/2013%2F08%2F19%2F39%2FJobsMovie.ac12d.jpg' ,'','movie'),
(9, 'butterfly effect' , 2004, 8.0, 'thriller', 'c', 'usa', 'ashton kutcher', 'https://i.ytimg.com/vi/-jymcKc7WNM/maxresdefault.jpg' ,'','movie'),
(10, 'walking dead' , 2008, 8.1, 'thriller', 'b', 'usa', 'andrew lincoln', 'https://m.media-amazon.com/images/M/MV5BOGFmYmMxZjYtNmM1Zi00ZTQ5LTgyMjUtOTkwYzBkZTY2OTE5XkEyXkFqcGdeQXRzdGFzaWVr._V1_UX477_CR0,0,477,268_AL_.jpg' ,'','serie'),
(11, 'house of cards' , 2017, 7.1, 'drama', 'b', 'usa', 'robin wright', 'https://occ-0-901-444.1.nflxso.net/art/3525c/e11bf6bfec43857bd842f7fb59205a035363525c.jpg' ,'', 'serie'),
(12, 'adventure time' , 2010, 6.0, 'comedy', 'a', 'usa', 'none', 'https://upload.wikimedia.org/wikipedia/en/3/37/Adventure_Time_-_Title_card.png' ,'','serie'),
(13, 'mad men' , 2014, 8.1, 'drama', 'b', 'usa', 'jon hamm', 'https://pmcvariety.files.wordpress.com/2017/07/mad-men1.jpg?w=1000' ,'','serie');

create table user_movie_list(
   id int primary key auto_increment,
   user_id int,
   movie_id int,
   constraint fk_UserMovie foreign key(user_id) references users(id),
   constraint fk_MovieUser foreign key(movie_id) references movies(id)
);

insert into user_movie_list 
values
(1, 1 ,1),
(2, 1 ,2),
(3, 1 ,3);

select * from user_movie_list;

/*
select *
from user_movie_list 
inner join users on user_movie_list.user_id = users.id
inner join movies on user_movie_list.movie_id = movies.id
where users.id = 1;
*/
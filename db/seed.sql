create table users (
user_id serial primary key,
user_email text,
user_password text
)

create table if not exists post (
    post_id serial primary key,
    user_id int references users(user_id),
    image_url varchar(250)
)


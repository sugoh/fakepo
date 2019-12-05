CREATE TYPE "products_status" AS ENUM (
	  'out_of_stock',
	  'in_stock',
	  'running_low'
);

CREATE TABLE "users" (
	  "id" SERIAL PRIMARY KEY,
	  "created_at" timestamp
);

CREATE TABLE "human_users" (
	  "id" int PRIMARY KEY,
	  "username" varchar,
	  "first_name" varchar,
	  "last_name" varchar,
	  "school_hs" int,
	  "school_undergrad" int,
	  "school_grad_0" int,
	  "school_grad_1" int,
	  "current_job" int,
	  "previous_job" int,
	  "phone" int,
	  "whatsapp" int,
	  "facebook_id" varchar,
	  "instagram_id" varchar,
	  "linkedin_id" varchar,
	  "twitter_id" varchar,
	  "email_personal" varchar,
	  "email_work" varchar
);

CREATE TABLE "login" (
	  "username" varchar PRIMARY KEY,
	  "password" varchar
);

CREATE TABLE "company_users" (
	  "id" int PRIMARY KEY,
	  "name" varchar,
	  "website" varchar
);

CREATE TABLE "career" (
	  "id" SERIAL PRIMARY KEY,
	  "position" int,
	  "company" int,
	  "location" int,
	  "experience_years" real,
	  "years_since_leaving" real,
	  "power" real
);

CREATE TABLE "positions" (
	  "id" SERIAL PRIMARY KEY,
	  "title" varchar,
	  "power" int
);

CREATE TABLE "countries" (
	  "id" SERIAL PRIMARY KEY,
	  "country" varchar
);

CREATE TABLE "cities" (
	  "id" SERIAL PRIMARY KEY,
	  "city" varchar,
	  "country_id" int
);

CREATE TABLE "high_schools" (
	  "id" SERIAL PRIMARY KEY,
	  "name" varchar
);

CREATE TABLE "colleges" (
	  "id" SERIAL PRIMARY KEY,
	  "name" varchar
);

CREATE TABLE "graduate_schools" (
	  "id" SERIAL PRIMARY KEY,
	  "name" varchar
);

ALTER TABLE "human_users" ADD FOREIGN KEY ("id") REFERENCES "users" ("id");

ALTER TABLE "human_users" ADD FOREIGN KEY ("school_hs") REFERENCES "high_schools" ("id");

ALTER TABLE "human_users" ADD FOREIGN KEY ("school_undergrad") REFERENCES "colleges" ("id");

ALTER TABLE "human_users" ADD FOREIGN KEY ("school_grad_0") REFERENCES "graduate_schools" ("id");

ALTER TABLE "human_users" ADD FOREIGN KEY ("school_grad_1") REFERENCES "graduate_schools" ("id");

ALTER TABLE "human_users" ADD FOREIGN KEY ("current_job") REFERENCES "career" ("id");

ALTER TABLE "human_users" ADD FOREIGN KEY ("previous_job") REFERENCES "career" ("id");

ALTER TABLE "login" ADD FOREIGN KEY ("username") REFERENCES "human_users" ("username");

ALTER TABLE "company_users" ADD FOREIGN KEY ("id") REFERENCES "users" ("id");

ALTER TABLE "career" ADD FOREIGN KEY ("position") REFERENCES "positions" ("id");

ALTER TABLE "career" ADD FOREIGN KEY ("company") REFERENCES "company_users" ("id");

ALTER TABLE "career" ADD FOREIGN KEY ("location") REFERENCES "cities" ("id");

ALTER TABLE "cities" ADD FOREIGN KEY ("country_id") REFERENCES "countries" ("id");


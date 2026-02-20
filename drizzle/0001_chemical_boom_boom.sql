CREATE TABLE `employees` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`role` varchar(255) NOT NULL DEFAULT '',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `trainings` (
	`id` varchar(64) NOT NULL,
	`employeeId` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`completionDate` varchar(10) NOT NULL,
	`expirationDate` varchar(10) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `trainings_id` PRIMARY KEY(`id`)
);

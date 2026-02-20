CREATE TABLE `emailNotifications` (
	`id` varchar(64) NOT NULL,
	`trainingId` varchar(64) NOT NULL,
	`employeeId` varchar(64) NOT NULL,
	`lastSentAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `emailNotifications_id` PRIMARY KEY(`id`)
);

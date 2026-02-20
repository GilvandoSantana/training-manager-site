CREATE TABLE `auditLogs` (
	`id` varchar(64) NOT NULL,
	`employeeId` varchar(64) NOT NULL,
	`action` varchar(50) NOT NULL,
	`changes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `auditLogs_id` PRIMARY KEY(`id`)
);

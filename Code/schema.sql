USE file_organizer_db;

ALTER TABLE generator_logs 
ADD COLUMN csv_path VARCHAR(255) AFTER image_path;
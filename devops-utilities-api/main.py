# from app.main import app
# import uvicorn
# # entry point
# if __name__ == "__main__":

#     uvicorn.run(
#         "app.api:app",
#         host="0.0.0.0",
#         port=8000,
#         reload=True
#     )
 



# CREATE TABLE users(
#     user_id INT AUTO_INCREMENT PRIMARY KEY,

#     full_name VARCHAR(255) NOT NULL,
#     email VARCHAR(255) NOT NULL UNIQUE,
#     phone VARCHAR(50) UNIQUE,

#     hashed_password VARCHAR(255) NOT NULL,

#     is_active BOOLEAN DEFAULT TRUE,
#     is_superuser BOOLEAN DEFAULT FALSE,

#     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
# );

# CREATE TABLE roles (
#     role_id INT AUTO_INCREMENT PRIMARY KEY,
#     name VARCHAR(100) NOT NULL UNIQUE,
#     description VARCHAR(255)
# );

# CREATE TABLE user_roles (
#     user_role_id INT AUTO_INCREMENT PRIMARY KEY,

#     user_id INT NOT NULL,
#     role_id INT NOT NULL,

#     assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

#     FOREIGN KEY (user_id) REFERENCES users(user_id)
#         ON DELETE CASCADE,

#     FOREIGN KEY (role_id) REFERENCES roles(role_id)
#         ON DELETE CASCADE,

#     UNIQUE KEY unique_user_roles (user_id, role_id)
# );
# Sow
#intro
This project is a statement of work (sow), a fullstack app built using react with vite for the frontend and django rest framework (DRF) for the backend API, and postgresql as the database.The app provides a secure, scalable, and multilingual user experience with JWT authentication, RESTful APIs, and a responsive user interface.

#techstack:

#frontend:
1. framework: react 19 with vite
2. lanaguage: javascript (ES6+)
3. styling: css
4. router and state: react router
5. HTTP request: axios
   
# dependencies for frontend
axios: ^1.13.1 : Used to communicate between frontend and backend.
i18next: ^25.6.1 : this library supports multiple langugaes.
react: ^19.1.1 : this library is for making ui components.
react-dom: ^19.1.1 : it handles rendering of react components in dom.
react-i18next: ^16.2.4 : React binding for i18next, enabling translation and localization in components.
react-icons: ^5.5.0 : it provides large set of scalable vector icons for ui.
react-router-dom: ^7.9.5 : it manages routing and navigation between frontend pages.
react-toastify: ^11.0.5 : it display notification for success, error, info for user feedbacks.

#backend:
1. framework: django 5 and drf
2. auth : jwt authentication (simple jwt)
3. database: postgresql
4. server: gunicorn for production
5. middleware: whitenoise for static file serving

# dependencies for backend
asgiref: 3.10.0 : enables ASGI support in Django for handling asynchronous requests.
Django: 5.2.7 : main backend framework that provides the MVC architecture and ORM.
django-cors-headers : 4.9.0 : allows secure cross-origin requests between frontend and backend.
djangorestframework : 3.16.1 : it makes it easier to create RESTful APIs to handle JSON data.
djangorestframework_simplejwt : 5.5.1 : implements JWT authentication for login, refresh, and access token.
gunicorn: 23.0.0 : production-ready WSGI HTTP server and used to deploy the Django app.
packaging: 25.0 :  it is used for internal version and dependency management.
psycopg2-binary: 2.9.11 : PostgreSQL database adapter for Django ORM.
PyJWT: 2.10.1 : it provides JSON Web Token (JWT) encoding and decoding functionality.
python-dotenv : 1.2.1 : it loads .env files securely.
sqlparse : 0.5.3 : it is used by Django for parsing and formatting SQL queries.
tzdata : 2025.2 : time zone database for consistent datetime management.
whitenoise: 6.11.0 : it serves static files efficiently in production environments.

#authentication flow
login: user submits credentials - backend validates - returns access & refresh token.  
access Token: short-lived token for API access.  
refresh Token: automatically renew the expired token.  
protected Routes: the routes are wrapped using authentication checks.  

#database
database: postgresql of render
reasons: higly reliable and well integrated with django orm
schema: it is managed through django migration system.

#development setup
#backend setup
# create virtual environment
python -m venv venv
On windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup database and migrations
python manage.py makemigrations
python manage.py migrate

# Run development server
python manage.py runserver

#frontend setup
# Install dependencies
npm install

# create a .env and define the path
VITE_API=http://127.0.0.1:8000

# run frontend
npm run dev

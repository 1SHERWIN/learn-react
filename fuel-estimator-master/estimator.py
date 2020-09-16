import pymysql
import pymysql.cursors
from datetime import datetime
from flask import Flask, render_template, request, flash, redirect, url_for, g
from flask_bootstrap import Bootstrap
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

from forms import LoginForm, RegisterForm, RequestQuoteForm, ClientInformationForm

# instantiate the app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:*ne14tuneit2h8$is@eee&ppp!@localhost:3306/cs3320'
db_uri = 'mysql+pymysql://root:*ne14tuneit2h8$is@eee&ppp!@localhost:3306/cs3320'
Bootstrap(app)

# create instance of database with app passed as argument, representing database structures as classes (Models)
sdb = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# necessary for flask wtforms to work
app.config['SECRET_KEY'] = 'dev'

class Database:
  # __init__: constructor. called when object created from class. class initializes attributes of class
  def __init__(self):
    host = "localhost"
    user = "root"
    password = "*ne14tuneit2h8$is@eee&ppp!"
    db = "cs3320"
    self.con = pymysql.connect(host=host, user=user, password=password, db=db,
                               cursorclass=pymysql.cursors.DictCursor)
    self.cur = self.con.cursor()

  def clientinformation(self):
    logged_in_user = current_user.username

    self.cur.execute(
      "SELECT fullName, address, city, state, zipCode, phone, email FROM clientinformation  WHERE fullName = %s;",
      [logged_in_user])
    clients = self.cur.fetchall()
    return clients

  def editclient(self):
    form = ClientInformationForm()
    logged_in_user = current_user.username
    id = form.clientid.data
    name = form.name.data
    address = form.address.data
    city = form.city.data
    state = "FL"
    zip = form.zipcode.data
    phone = form.phone.data
    email = form.email.data

    self.cur.execute(
      "SELECT fullName, address, city, state, zipCode FROM clientinformation  WHERE fullName = %s;", [logged_in_user])
    clients = self.cur.fetchall()

    self.cur.execute("UPDATE clientinformation SET fullName=%s, address=%s WHERE fullname = %s", (name, city, state))
    return clients


  def quotehistory(self):
    logged_in_user = current_user.username

    self.cur.execute(
      "SELECT quoteId, clientId, gallonsRequested, requestDate, deliveryDate, deliveryAddress, deliveryCity, deliveryState, deliveryZipCode, deliveryContactName,deliveryContactPhone, deliveryContactEmail, suggestedPrice, totalAmountDue  FROM fuelquote WHERE deliveryContactName = %s;",
      [logged_in_user])
    quotes = self.cur.fetchall()
    return quotes


# each class is its own table in database
class Quote(sdb.Model):
  __tablename__ = 'fuelquote'
  id = sdb.Column('quoteId', sdb.Integer, primary_key=True, autoincrement=True)
  clientid = sdb.Column('clientId', sdb.Integer, nullable=False)
  gallons = sdb.Column('gallonsRequested', sdb.Float)
  reqDate = sdb.Column('requestDate', sdb.DateTime)
  delivDate = sdb.Column('deliveryDate', sdb.DateTime)
  addr = sdb.Column('deliveryAddress', sdb.String(255), nullable=False)
  city = sdb.Column('deliveryCity', sdb.String(100), nullable=False)
  state = sdb.Column('deliveryState', sdb.String(2), nullable=False)
  _zip = sdb.Column('deliveryZipCode', sdb.String(10), nullable=False)
  name = sdb.Column('deliveryContactName', sdb.String(255), nullable=False)
  phone = sdb.Column('deliveryContactPhone', sdb.String(10), nullable=False)
  email = sdb.Column('deliveryContactEmail', sdb.String(255), nullable=False)
  rate = sdb.Column('suggestedPrice', sdb.Float)
  total = sdb.Column('totalAmountDue', sdb.Float)

  def is_authenticated(self):
    return True


class Client(UserMixin, sdb.Model):
  __tablename__ = 'clientinformation'
  id = sdb.Column('clientId', sdb.Integer, primary_key=True, autoincrement=True)
  fullName = sdb.Column(sdb.String(255), nullable=False)
  address = sdb.Column(sdb.String(255), nullable=False)
  city = sdb.Column(sdb.String(100), nullable=False)
  state = sdb.Column(sdb.String(2), nullable=False)
  zipCode = sdb.Column(sdb.String(80), nullable=False)
  phone = sdb.Column(sdb.String(10), nullable=False)
  email = sdb.Column(sdb.String(255), nullable=False)

  def is_authenticated(self):
    return True


# each class is its own table in database
class User(UserMixin, sdb.Model):
  id = sdb.Column(sdb.Integer, primary_key=True)
  username = sdb.Column(sdb.String(20), unique=True)
  email = sdb.Column(sdb.String(50), unique=True)
  password = sdb.Column(sdb.String(80))

  # how want to display object when printed
  def __repr__(self):
    return f"User('{self.username}', {self.email})"

  def is_active(self):
    # Here you should write whatever the code is
    # that checks the database if your user is active
    return self.active

  def is_anonymous(self):
    return False

  def is_authenticated(self):
    return True


# connect flask login with database data
@login_manager.user_loader
def load_user(user_id):
  return User.query.get(int(user_id))


@app.route("/")
@app.route("/home", methods=['GET', 'POST'])
def home():
  form = RequestQuoteForm()
  if form.validate_on_submit():
    new_quote = Quote(clientid=form.clientId.data, gallons=form.gallonsRequested.data,
                      reqDate=form.requestDate.data, delivDate=form.deliveryDate.data,
                      addr=form.deliveryAddress.data, city=form.deliveryCity.data,
                      state=form.deliveryState.data, _zip=form.deliveryZipCode.data,
                      email=form.deliveryContactEmail.data,
                      name=form.deliveryContactName.data, phone=form.deliveryContactPhone.data,
                      rate=form.suggestedPrice.data, total=form.gallonsRequested.data * form.suggestedPrice.data)
    sdb.session.add(new_quote)
    sdb.session.commit()

  print('routing . . . home')
  return render_template('home.html', title='Home', form=form)


@app.route('/client_info/', methods=['GET', 'POST'])
@login_required
def client_info():
  def db_query():
    db = Database()
    clients = db.clientinformation()
    return clients

  # action = request.form.get("action")
  # if action == "Delete":
  #   return redirect(url_for('delete_client'))
  # elif action == "Update":
  #   return redirect(url_for('edit_client'))

  res = db_query()
  return render_template('client_info.html', result=res, content_type='application/json')


@app.route('/edit_client', methods=['GET', 'POST'])
@login_required
def edit_client():
  action = request.form.get("action")
  if action == "Update":

    newname = request.form.get("new_name")
    oldname = request.form.get("old_name")
    client = Client.query.filter_by(fullName=oldname).first()
    client.fullName = newname

    newaddress = request.form.get("new_address")
    client = Client.query.filter_by(fullName=oldname).first()
    client.address = newaddress

    newcity = request.form.get("new_city")
    client = Client.query.filter_by(fullName=oldname).first()
    client.city = newcity

    newstate = request.form.get("new_state")
    client = Client.query.filter_by(fullName=oldname).first()
    client.state = newstate

    newzipcode = request.form.get("new_zipCode")
    client = Client.query.filter_by(fullName=oldname).first()
    client.zipCode = newzipcode

    newphone = request.form.get("new_phone")
    client = Client.query.filter_by(fullName=oldname).first()
    client.phone = newphone

    newemail = request.form.get("new_email")
    client = Client.query.filter_by(fullName=oldname).first()
    client.email = newemail
    flash("Successfully updated!")

  elif action == "Delete":
    oldname = request.form.get("old_name")
    signin_client = User.query.filter_by(username=oldname).first(all)
    client = Client.query.filter_by(fullName=oldname).first()
    fk_id = client.id
    fk_client = Quote.query.filter_by(clientid=fk_id).all()
    for o in fk_client:
      sdb.session.delete(o)
    sdb.session.commit()

    sdb.session.delete(signin_client)
    sdb.session.delete(client)
    sdb.session.commit()
    flash("Successfully deleted!")



  sdb.session.commit()
  return redirect("/client_info")


@app.route('/delete_client/', methods=['POST'])
@login_required
def delete_client():
  oldname = request.form['old_name']
  client = Client.query.filter_by(fullName=oldname).first()
  sdb.session.delete(client)
  sdb.session.commit()
  return redirect("/client_info")


@app.route('/quote_history/')
def quote_history():
  def db_query():
    db = Database()
    quotes = db.quotehistory()
    return quotes

  res = db_query()
  return render_template('quote_history.html', result=res, content_type='application/json')


@app.route('/login', methods=['GET', 'POST'])
def login():
  form = LoginForm()
  if form.validate_on_submit():
    user = User.query.filter_by(username=form.username.data).first()
    if user is None:
      flash("User not registered!")
      return redirect(url_for('login'))
    if user:
      if check_password_hash(user.password, form.password.data):
        login_user(user, remember=form.remember.data)
        return redirect(url_for('client_info'))
      else:
        flash("Invalid username or password")

      # return '<h1>Invalid username or password</h1>'
    # return '<h1>' + form.username.data + ' ' + form.password.data + '</h>'

  return render_template('auth/login.html', title='Sign In', form=form)


@app.route('/logout')
def logout():
  logout_user()
  return redirect(url_for('home'))


@app.route('/register', methods=['GET', 'POST'])
def register():
  form = RegisterForm()
  if form.validate_on_submit():
    # prevent display plaintext password in event of hack
    hashed_password = generate_password_hash(form.password.data, method='sha256')
    new_user = User(username=form.username.data, email=form.email.data, password=hashed_password)
    sdb.session.add(new_user)
    sdb.session.commit()

    flash("User is now registered!")
    # return '<h1>' + form.username.data + ' ' + form.password.data + ' ' + form.email.data + '</h>'

  return render_template('auth/register.html', title='Register', form=form)


if __name__ == '__main__':
  app.run(debug=True)

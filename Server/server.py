from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mail import Mail, Message

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


uri = (
    "" #Enter mongoDB conection URL here
)
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi("1"))
# Send a ping to confirm a successful connection
try:
    client.admin.command("ping")
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

Database = client.get_database("Companies")
companyTable = Database.Company


app = Flask(__name__)
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USERNAME"] = "aryashailesh11"
app.config["MAIL_PASSWORD"] = ""
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USE_SSL"] = True
mail = Mail(app)

CORS(app)


@app.route(
    "/send_email",
)
def send_email():
    # msg = Message(
    #     "Hello",
    #     sender="aryashailesh12@gmail.com",  # enter your email here
    #     recipients=["aryashailesh11@gmail.com"],  # enter your email here
    # )
    # msg.body = "Hello Flask message sent from Flask-Mail"
    # mail.send(msg)
    # return "Sent"
    msg = Message(
        "Hello", sender="your-email@example.com", recipients=["customer@example.com"]
    )
    msg.body = "This is the email body"
    mail.send(msg)
    return "Email sent!"


@app.route("/")
def index():
    return "Hello, World!"


@app.route("/companies", methods=["GET"])
def get_companies():
    query = companyTable.find()
    output = {}
    i = 0
    for x in query:
        output[i] = x
        output[i].pop("_id")
        i += 1
    return jsonify(output)
    # return {
    #     "companies": [ "comp1", "comp2"]
    #     }


@app.route("/addcompanypg2", methods=["POST"])
def add_company():
    if request.method == "POST":
        req_data = {}

        req = request.json
        print(req)
        req_data["name"] = req["name"]
        req_data["logo"] = req["logo"]
        req_data["address"] = req["address"]
        req_data["terms"] = req["terms"]
        x = companyTable.insert_one(req_data)
        return "Company added successfully"


@app.route("/companysettings/<name>", methods=["GET", "POST", "DELETE"])
def get_company_settings(name):
    if request.method == "GET":
        print("Name:", name)
        # find a record in mongodb collection
        query = companyTable.find({"name": name})
        output = {}
        i = 0
        for x in query:
            output[i] = x
            output[i].pop("_id")
            i += 1
        return jsonify(output)
        # return "Company settings"
    elif request.method == "POST":
        req_data = {}
        req = request.json
        print(req)
        req_data["name"] = req["name"]
        req_data["logo"] = req["logo"]
        req_data["address"] = req["address"]
        req_data["terms"] = req["terms"]
        x = companyTable.update_one({"name": name}, {"$set": req_data}, upsert=True)
        return jsonify("Company settings updated successfully")
    elif request.method == "DELETE":
        print("Name:", name)
        # check for record present in mongodb and delete it
        query = companyTable.find({"name": name})
        output = {}
        i = 0
        for x in query:
            output[i] = x
            output[i].pop("_id")
            i += 1
        print(output)
        if output:
            companyTable.delete_one({"name": name})
            return jsonify("Company deleted successfully")
        else:
            return jsonify("Company not found")
    else:
        return "Error"


@app.route("/addClient", methods=["POST"])
def add_client():
    if request.method == "POST":
        req_data = {}
        req = request.json
        myquery = {"name": req["selectCompany"]}
        newvalues = {"$set": {"name": req["selectCompany"], "Clients": req_data}}
        isPresent = companyTable.find(myquery)
        for x in isPresent:
            print(x["name"])
        req_data["client_name"] = req["client"]
        req_data["client_address"] = req["clientAddress"]
        if x["name"] == req["selectCompany"]:
            companyTable.update_one(
                {"name": req["selectCompany"]},
                {"$push": {"Client": req_data}},
                upsert=True,
            )
        else:
            companyTable.insert_one(newvalues)
        print(req)
        return "Client added successfully"
    else:
        return "Error"


@app.route("/clientprojects/<name>", methods=["GET", "DELETE"])
def get_client_projects(name):
    if request.method == "GET":
        print("Name:", name)
        # find a record in mongodb collection
        query = companyTable.find({"Client": {"$elemMatch": {"client_name": name}}})
        output = {}
        i = 0
        for x in query:
            output[i] = x
            output[i].pop("_id")
            i += 1
        return jsonify(output)
        # return "Company settings"
        # return jsonify(name)
    elif request.method == "DELETE":
        print("Name:", name)
        # check for record present in mongodb and delete it
        query = companyTable.find({"Client": {"$elemMatch": {"client_name": name}}})
        output = {}
        i = 0
        for x in query:
            output[i] = x
            output[i].pop("_id")
            i += 1
        print(output)
        if output:
            companyTable.update_one(
                {"Client": {"$elemMatch": {"client_name": name}}},
                {"$pull": {"Client": {"client_name": name}}},
            )
            return jsonify("Client deleted successfully")
        else:
            return jsonify("Client not found")
    else:
        return "Error"


# Delete a client project
@app.route("/clientprojects/<clientname>/<projectname>", methods=["GET", "DELETE"])
def delete_client_project(clientname, projectname):
    if request.method == "GET":
        print("Client Name:", clientname)
        print("Project Name:", projectname)
        # find a record in mongodb collection
        query = companyTable.find(
            {"Client": {"$elemMatch": {"client_name": clientname}}}
        )
        output = {}
        i = 0
        for x in query:
            output[i] = x
            output[i].pop("_id")
            i += 1
        print(output)
        for x in output:
            for y in output[x]["Client"]:
                if y["client_name"] == clientname:
                    for z in y["Projects"]:
                        if z["projectName"] == projectname:
                            print("Z:", z)
                            companyTable.update_one(
                                {"Client": {"$elemMatch": {"client_name": clientname}}},
                                {
                                    "$pull": {
                                        "Client.$.Projects": {
                                            "projectName": projectname
                                        }
                                    }
                                },
                            )
                            return jsonify("Project deleted successfully")
        return jsonify("Project not found")
        # return jsonify(output)


# Get a client project
@app.route("/viewquotation/<projectname>", methods=["GET"])
def get_project(projectname):
    print("Project Name:", projectname)
    if request.method == "GET":
        # serach for document
        query = companyTable.find(
            {
                "Client": {
                    "$elemMatch": {
                        "Projects": {"$elemMatch": {"projectName": projectname}}
                    }
                }
            }
        )
        output = {}
        req_data = {}
        i = 0
        for x in query:
            output[i] = x
            output[i].pop("_id")
            i += 1
        print("Output:", output)
        req_data["projectName"] = projectname
        req_data["name"] = output[0]["name"]
        req_data["logo"] = output[0]["logo"]
        req_data["address"] = output[0]["address"]
        req_data["terms"] = output[0]["terms"]

        # return jsonify(output)
        for x in output:
            for y in output[x]["Client"]:
                for z in y["Projects"]:
                    if z["projectName"] == projectname:
                        print(z)
                        req_data["project_no"] = z["projectNo"]
                        req_data["contactEmail"] = z["contactEmail"]
                        req_data["contactPhone"] = z["contactPhone"]
                        req_data["client_name"] = y["client_name"]
                        req_data["client_address"] = y["client_address"]
                        req_data["project"] = z
                        return jsonify(req_data)
        return jsonify("Project not found")
    else:
        return "Error"


# Edit quotation
@app.route("/editquotation/<projectname>", methods=["GET", "POST"])
def edit_project(projectname):
    print("Project Name:", projectname)
    if request.method == "POST":
        req_data = {}
        req = request.json
        print("\n\n*********\n\n")
        print(req)
        print("\n\n*********\n\n")
        # print(req["projectName"])
        myquery = {
            "Client": {
                "$elemMatch": {"Projects": {"$elemMatch": {"projectName": projectname}}}
            }
        }
        newvalues = {"$set": {"Client": {"client_name": "arya", "Projects": req_data}}}
        isPresent = companyTable.find(myquery)
        print("Is Present: ", isPresent)
        for x in isPresent:
            print("IsPresent: data::", x["Client"])
            req_data["project_no"] = req["projectNo"]
            req_data["project_name"] = req["projectName"]

            # print(x["Client"][0]["client_name"])
            for i in x["Client"]:
                print("Inside for i:", i)
                if i["client_name"] == "arya":
                    print("Inside If")
                    companyTable.update_one(
                        {"Client": {"$elemMatch": {"client_name": "arya"}}},
                        {"$push": {"Client.$.Projects": req}},
                        upsert=True,
                    )
                else:
                    print("Inside else")
                    # companyTable.insert_one(newvalues)

        return jsonify("Quotation edited successfully")
    elif request.method == "GET":
        return get_project(projectname)
    else:
        return "Error"


@app.route("/addquotation/<name>", methods=["GET", "POST"])
def add_quotation(name):
    if request.method == "POST":
        req_data = {}
        req = request.json
        print("\n\n*********\n\n")
        print(req)
        print(req["projectName"])
        myquery = {"Client": {"$elemMatch": {"client_name": name}}}
        newvalues = {"$set": {"Client": {"client_name": name, "Projects": req_data}}}
        isPresent = companyTable.find(myquery)
        print("Is Present: ", isPresent)
        for x in isPresent:
            print("IsPresent: data::", x["Client"])
            req_data["project_no"] = req["projectNo"]
            req_data["project_name"] = req["projectName"]

            # print(x["Client"][0]["client_name"])
            for i in x["Client"]:
                print("Inside for i:", i)
                if i["client_name"] == name:
                    print("Inside If")
                    companyTable.update_one(
                        {"Client": {"$elemMatch": {"client_name": name}}},
                        {"$push": {"Client.$.Projects": req}},
                        upsert=True,
                    )
                else:
                    print("Inside else")
                    # companyTable.insert_one(newvalues)

        return jsonify("Quotation added successfully for client: " + name)
    elif request.method == "GET":
        return "Getting"
    else:
        return "Error"


if __name__ == "__main__":
    app.run(debug=True)

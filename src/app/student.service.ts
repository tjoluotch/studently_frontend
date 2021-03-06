import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Student} from './student';
import {JwToken} from './jw-token';
import {Module} from './module';
import {AddTaskModel} from './add-task-model';
import {EditTaskModel} from './edit-task-model';
import {CwModuleId} from './cw-module-id';
import {Chat} from './chat';
import {Message} from './message';
import {Document} from './document';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {

  }
  // Headers with the request im sending so that i get back full http
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response' as 'body'
  };

  // url to Golang API: post a student to DB
  private signupStudentUrl = '/api/signup';

  // url to login a student
  private loginStudentUrl = '/api/authenticate';

  // url to check code from phone as a post request
  private phoneCodeUrl = '/api/phonecode';

  // url to get a student as a get request
  private getStudentUrl = '/api/getstudent';

  // url to get all of a particular students modules
  private getModulesUrl = '/api/getmodules';

  // url to add a module
  private addModuleUrl = '/api/addmodule';

  // url to add a Task
  private addTaskUrl = '/api/addtask';

  // url to edit task
  private editTaskUrl = '/api/editask';

  // url to add coursework
  private addCourseworkUrl = '/api/addcwk';

  // url to create a chat group
  private createChatGroupUrl = '/api/createchat';

  // url to get all chat groups the member is in
  private getMyChatGroupsUrl = '/api/getmychats';

  // url to get chat by the chat id
  private getChatByIdUrl = '/api/getchatbyid';

  // url to send a message in the group chat
  private sendMessageUrl = '/api/sendmsg';

  // url to edit a chat name
  private editGroupChatNameUrl = '/api/edit_chat_name';

  // url to get a particular students documents
  private getUploadsUrl = '/api/getuploads';

  // url to get all students
  private getAllStudentsUrl = '/api/getallstudents';

  // url to add member to chat
  private addMemberToChatUrl = '/api/addstudenttochat';

// post request for student signup
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.signupStudentUrl, student, this.httpOptions);
  }


  loginStudent(student: Student): Observable<HttpResponse<JwToken>> {
    return this.http.post<HttpResponse<JwToken>>(this.loginStudentUrl, student, this.httpOptions);
      //.pipe(
       // catchError
      //);
  }

  loggedIn() {
    return !!(localStorage.getItem('token') && localStorage.getItem('signK'));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getSignK() {
    return localStorage.getItem('signK');
  }

  getChatID() {
    return localStorage.getItem('getChat');
  }

  getStudent(): Observable<HttpResponse<Student>> {
    return this.http.get<HttpResponse<Student>>(this.getStudentUrl, this.httpOptions);
  }

  sendPhoneCode(pCode: Object): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>(this.phoneCodeUrl, pCode, this.httpOptions);
  }

  getModules(): Observable<HttpResponse<Module[]>> {
    return this.http.get<HttpResponse<Module[]>>(this.getModulesUrl, this.httpOptions);
  }

  addModule(module: Module): Observable<HttpResponse<Module>> {
    return this.http.put<HttpResponse<Module>>(this.addModuleUrl, module, this.httpOptions);
  }

  addTask(taskWithModule: AddTaskModel): Observable<HttpResponse<Object>> {
    return this.http.put<HttpResponse<Object>>(this.addTaskUrl, taskWithModule, this.httpOptions);
  }

  editTask(taskAndModuleId: EditTaskModel): Observable<HttpResponse<Object>> {
    return this.http.put<HttpResponse<Object>>(this.editTaskUrl, taskAndModuleId, this.httpOptions);
  }

  addCoursework(cwWithModuleID: CwModuleId): Observable<HttpResponse<Object>> {
    return this.http.put<HttpResponse<Object>>(this.addCourseworkUrl, cwWithModuleID, this.httpOptions);
  }

  createChatGroup(chat: Chat): Observable<HttpResponse<Chat>> {
    return this.http.put<HttpResponse<Chat>>(this.createChatGroupUrl, chat, this.httpOptions);
  }

  getChatGroups(): Observable<HttpResponse<Chat[]>> {
    return this.http.get<HttpResponse<Chat[]>>(this.getMyChatGroupsUrl, this.httpOptions);
  }

  getUploads(): Observable<HttpResponse<Document[]>> {
    return this.http.get<HttpResponse<Document[]>>(this.getUploadsUrl, this.httpOptions);
  }

  getAllStudents(): Observable<HttpResponse<Student[]>> {
    return this.http.get<HttpResponse<Student[]>>(this.getAllStudentsUrl, this.httpOptions);
  }

  getChatById(): Observable<HttpResponse<Chat>> {
    return this.http.get<HttpResponse<Chat>>(this.getChatByIdUrl, this.httpOptions);
  }

  sendMessage(msg: Message): Observable<HttpResponse<Object>> {
    return this.http.put<HttpResponse<Object>>(this.sendMessageUrl, msg, this.httpOptions);
  }

  addMember(std: Student): Observable<HttpResponse<Object>> {
    return this.http.put<HttpResponse<Object>>(this.addMemberToChatUrl, std, this.httpOptions);
  }

  editGrpName(chat: Chat): Observable<HttpResponse<Object>> {
    return this.http.put<HttpResponse<Object>>(this.editGroupChatNameUrl, chat, this.httpOptions);
  }

}

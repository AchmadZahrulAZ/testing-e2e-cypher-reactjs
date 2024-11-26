describe('Todo List App', () => {
  // cek localhost untuk pertama kalinya
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('check localhost', () => {
    cy.visit('http://localhost:5173/');
  });

  // mengecek input form dan button, serta h1
  it('check display app', () => {
    // check input form
    cy.get("input[cy-data='input-form']").should('be.visible');
    // check input button
    cy.get("button[cy-data='input-button']").should('be.visible');
    // check h1
    cy.get("h1[cy-data='app-title']").should('be.visible');
  });

  // testing input form
  it('should add a new task', () => {
    const task = 'testing task';
    // add data to input form
    cy.get("input[cy-data='input-form']").type(task);
    // click button add
    cy.get("button[cy-data='input-button']").click();
    // check data in list
    cy.get('ul.list-group').should('contain.text', task);
    // delete
    cy.get("button[cy-data='delete-button']").click();
  });

  // testing toggle task completion
  it('should toggle task completion', () => {
    const task = 'testing completed task';
    // add data to input form
    cy.get("input[cy-data='input-form']").type(task);
    // click button add
    cy.get("button[cy-data='input-button']").click();
    // check data in list
    cy.get('ul.list-group').should('contain.text', task);
    // click task to toggle completion
    cy.get('ul.list-group li span').first().click();
    // check if the task has the completed class
    cy.get('ul.list-group li').first().should('have.class', 'list-group-item-secondary');
    // toggle it back to incomplete
    cy.get('ul.list-group li span').first().click();
    // check if the task no longer has the completed class
    cy.get('ul.list-group li').first().should('not.have.class', 'list-group-item-secondary');
    // delete
    cy.get("button[cy-data='delete-button']").click();
  });

  // testing update task
  it('should update task', () => {
    const task = 'testing update';
    const newTask = 'testing update has success';
    // add data to input form
    cy.get("input[cy-data='input-form']").type(task);
    // click button add
    cy.get("button[cy-data='input-button']").click();
    // check data in list
    cy.get('ul.list-group').should('contain.text', task);

    // click update button
    cy.get("button[cy-data='edit-button']").click();
    // update value on form input
    cy.get("input[cy-data='input-form']").clear().type(newTask);
    // click button update
    cy.get("button[cy-data='input-button']").click();
    // check data in list
    cy.get('ul.list-group').should('contain.text', newTask);
    // delete
    cy.get("button[cy-data='delete-button']").click();
  });

  // testing hapus task
  it('should delete task', () => {
    const task = 'testing delete';
    // add data to input form
    cy.get("input[cy-data='input-form']").type(task);
    // click button add
    cy.get("button[cy-data='input-button']").click();
    // check data in list
    cy.get('ul.list-group').should('contain.text', task);

    // click delete button
    cy.get("button[cy-data='delete-button']").click();
    // check if the list is empty and "You have no todos" is displayed
    cy.get('.alert.alert-secondary').should('contain.text', 'You have no todos');
  });

  // testing ganti bahasa
  it('should change language', () => {
    // initial language should be English
    cy.get("h1[cy-data='app-title']").should('have.text', 'To-Do App');
    // click language toggle button
    cy.get("button[cy-data='language-select']").click();
    // check if language changes to Indonesian
    cy.get("h1[cy-data='app-title']").should('have.text', 'Aplikasi To-Do');
    // toggle back to English
    cy.get("button[cy-data='language-select']").click();
    // check if language changes back to English
    cy.get("h1[cy-data='app-title']").should('have.text', 'To-Do App');
  });
});

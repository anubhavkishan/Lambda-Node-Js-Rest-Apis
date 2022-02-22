const {createMachine, assign} = require('xstate')

  const userRegistrationMachine = createMachine({
    id: "signup",
    initial: "idle",
    context: {
      message: ""
    },
    states: {
      idle: {
        on: {
          SUBMIT: [
            {
              target: "loading",
              cond: (context, event) => event.data.email !== "",
              actions: assign({
                message: (context, event) => "Signing you up..."
              })
            },
            {
              target: "error",
              actions: assign({
                message: (context, event) => "Please enter a valid email"
              })
            }
          ]
        }
      },
      loading: {
        invoke: {
          id: "submitSignup",
          src: (context, event) => signupUser(event.data.email),
          onDone: {
            target: "success",
            actions: assign({
              message: (context, event) => event.data
            })
          },
          onError: {
            target: "error",
            actions: assign({
              message: (context, event) => event.data
            })
          }
        }
      },
      success: {
        type: "final"
      },
      error: {
        on: {
          SUBMIT: [
            {
              target: "loading",
              cond: (context, event) => event.data.email !== "",
              actions: assign({
                message: (context, event) => "Signing you up..."
              })
            },
            {
              target: "error",
              actions: assign({
                message: (context, event) => "Please enter a valid email"
              })
            }
          ]
        }
      }
    }
  });
  // console.log(userRegistrationMachine.initialState);

  module.exports = userRegistrationMachine;
  
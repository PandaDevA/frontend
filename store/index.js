import Vuex from "vuex";

export const state = () => ({
  person: {},
  people: {},
});

export const getters = {
  getPerson: (state) => state.person,
  getPeople: (state) => state.people,
};

export const mutations = {
  SET_PERSON(state, person) {
    state.person = person;
  },
  SET_PEOPLE(state, people) {
    state.people = people;
  },
};

export const actions = {
  loadPerson({ commit, state }, id) {
    const person = state.people.find(person => person.id == id)
    commit("SET_PERSON", person);
  },

  loadAccount({ commit, state }, id) {
    const account = state.accounts.find(account => account.id == id)
    commit("SET_ACCOUNT", account);
  },
  async loadPeople({ commit }) {
    const people = await this.$axios.$get("/api/people?start=0&length=10&sortBy=id&sort=asc");
    commit("SET_PEOPLE", people);
  },
  async deletePeople({ commit, dispatch }, id) {
    this.$axios
      .$delete("/api/people/" + id)
      .then((response) => dispatch("loadPeople"));
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};

<template>
  <!--p>
    Country: {{ name }}<br>
    Capital: {{ capital }}
  </p-->
  <!--p v-for="country in countries" :key="country.name">
    Country: {{ country.name }}<br>
    Capital: {{ country.capital }}
  </p-->
  <p v-for="user in users" :key="user.firstName">
    {{ user.firstName }} {{ user.lastName }}
  </p>
  <!--p>
    Country: {{ name }}<br>
    Capital: {{ capital }}
  </p-->
  <!--button @click="addCountryCapital">Add Capital</button-->
  <!--p>
    Country: {{ name }} (aka. {{ aka }})<br>
    Capital: {{ capital }}
  </p-->
  <!--button @click="addAlsoKnownAs">Add AKA</button-->
</template>

<script>
// the relevant methods
// import { collection, addDoc } from "firebase/firestore"
// import { doc, setDoc } from "firebase/firestore"
// import { doc, updateDoc } from "firebase/firestore"
// import { doc, getDoc } from "firebase/firestore"
// import { query, collection, getDocs } from "firebase/firestore"
// import { where, query, collection, getDocs } from "firebase/firestore"
// import { query, collection, getDocs, orderBy  } from "firebase/firestore"
// import { query, collection, getDocs, orderBy, limit } from "firebase/firestore"
// import { doc, deleteDoc } from 'firebase/firestore'
// import { doc, updateDoc, deleteField } from 'firebase/firestore'
// import { doc, setDoc, getDoc } from 'firebase/firestore'
// import { doc, setDoc, onSnapshot } from 'firebase/firestore'
// import { collection, onSnapshot } from 'firebase/firestore'
import { query, where, collection, onSnapshot } from 'firebase/firestore'
// the firestore instance
import db from './firebase/init.js'

export default {
  data() {
    return {
      name: '',
      capital: '',
      countries: [],
      users: []
    }
  },
  created() {
    // this.createUser()
    // this.createCountry()
    // this.addCountryCapital()
    // this.updateCountry()
    // this.getCountry()
    this.getUsers()
    // this.dropCountry()
    // this.dropCapital()
  },
  methods: {
    async createUser() {
      // 'users' collection reference
      const colRef = collection(db, 'users')
      // data to send
      const dataObj = {
        firstName: 'Agus',
        lastName: 'Toesan',
        dob: '1990'
      }

      // create document and return reference to it
      const docRef = await addDoc(colRef, dataObj)

      // access auto-generated ID with '.id'
      console.log('Document was created with ID:', docRef.id)
    },
    async createCountry() {

      // await setDoc(doc(db, 'countries', 'US'), {
      //   name: 'United States'
      // })
      await setDoc(doc(db, 'countries', 'GB'), {
        name: 'Great Britain'
      })
    },
    async addCountryCapital() {

      await setDoc(doc(db, 'countries', 'GB'), {
        // new data
        capital: 'London'
        // merge
      }, { merge: true })
    },
    async updateCountry() {

      await updateDoc(doc(db, 'countries', 'GB'), {
        capital: 'Londinium'
      })
    },
    // async getCountry() {

    //   const docSnap = await getDoc(doc(db, 'countries', 'GB'))

    //   if (docSnap.exists()) {
    //     console.log(docSnap.data())
    //     this.name = docSnap.data().name
    //     this.capital = docSnap.data().capital
    //   } else {
    //     console.log('Document does not exist')
    //   }

    // },
    // async getCountry() {
    //   // query to get all docs in 'countries' collection
    //   const querySnap = await getDocs(query(collection(db, 'countries')));

    //   // add each doc to 'countries' array
    //   querySnap.forEach((doc) => {
    //     this.countries.push(doc.data())
    //   })

    // },
    // async getUsers() {
    //   // filter to get users with 'dob' after 1990
    //   const q = query(collection(db, 'users'), where('dob', '>', '1990'))
    //   const querySnap = await getDocs(q);

    //   querySnap.forEach((doc) => {
    //     this.users.push(doc.data())
    //   })

    // }
    // async getUsers() {
    //   // order users by name (alphabetical order)
    //   const q = query(collection(db, 'users'), orderBy('firstName'))
    //   const querySnap = await getDocs(q);

    //   querySnap.forEach((doc) => {
    //     this.users.push(doc.data())
    //   })

    // }
    
    // async getUsers() {
    //   // limit the ordered users to 1
    //   const q = query(collection(db, 'users'), orderBy('firstName'), limit(1))
    //   const querySnap = await getDocs(q);

    //   querySnap.forEach((doc) => {
    //     this.users.push(doc.data())
    //   })

    // },
    async dropCountry() {
      await deleteDoc(doc(db, 'countries', 'US'))
    },
    async dropCapital() {
      await updateDoc(doc(db, 'countries', 'GB'), {
        capital: deleteField()
      })
    },
    async addCountryCapital() {
      // add capital to country
      await setDoc(doc(db, 'countries', 'GB'), {
        capital: 'London'
      }, { merge: true })
    },
    async getCountry() {
      // register realtime listener
      // for changes on 'GB' document
      onSnapshot(doc(db, 'countries', 'GB'), (snap) => {
        this.aka = snap.data().aka
        this.name = snap.data().name
        this.capital = snap.data().capital
      })
    },
    async addAlsoKnownAs() {
      // add 'aka' field to document
      await setDoc(doc(db, 'countries', 'GB'), {
        aka: 'United Kingdom'
      }, { merge: true })
    },
    // async getUsers() {
    //   // use 'collection()' instead of 'doc()'
    //   onSnapshot(collection(db, 'users'), (snap) => {

    //     snap.forEach((doc) => {
    //       this.users.push(doc.data())
    //     })
    //   })
    // }
    async getUsers() {

      onSnapshot(
        // use 'query()' instead of a reference
        query(collection(db, 'users'), where('dob', '>', '1990')),
        (snap) => {
          snap.forEach((doc) => {
            this.users.push(doc.data())
        })
      })
    }
  }
}
</script>
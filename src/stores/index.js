import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useApiStore = defineStore('apiCalls', () => {
  const responses = ref({})
  const lottie = ref(0)

  const token = 'd0355b48bdc3c40d895b71991ec35e'

  const call = (id) => {
    if (!responses.value[id]) {
      fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          query: querrys[id]
        })
      })
        .then((res) => res.json())
        .then((res) => {
          let data = [res.data]
          console.log(id, data)
          responses.value[id] = data
          // data.map((items) => {
          //   Object.keys(items).map((item) => (responses.value[item] = items?.[item]))
          // })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  const readJSON = (link) => {
    if (!lottie.value) {
      fetch(link)
        .then((res) => res.json())
        .then((res) => {
          if (!lottie.value) {
            lottie.value = res
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const getVideo = (url) => {
    fetch(url, {
      method: 'GET'
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const querrys = {
    projects: `
      {
        allProjects(first: 100) {
          _modelApiKey
          id
          title
          subTitle
          text (markdown: true)
          image {
            id
            responsiveImage {
              alt
              base64
              bgColor
              title
              webpSrcSet
              width
              srcSet
              src
              sizes
              height
              aspectRatio
            }
          }
        }
        allTagClients {
          id
          _modelApiKey
          label
        }
        allTagProjectSorts {
          id
          _modelApiKey
          label
        }
        allTagsProjectAreas {
          id
          _modelApiKey
          label
        }
      }`,
    about: `
    {
      about {
        aboutText (markdown: true)
        id
        _modelApiKey
      }
    }`
  }

  return { responses, call, lottie, readJSON, getVideo }
})

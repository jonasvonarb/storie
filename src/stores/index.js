import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGeneral = defineStore('generalStore', () => {
  const selected = ref([])

  const toggleSelected = (tag) => {
    const type = tag._modelApiKey
    const id = tag.id
    if (!selected.value[type]) selected.value[type] = []
    if (selected.value[type].includes(id)) {
      selected.value[type] = selected.value[type].filter((item) => item !== id)
    } else {
      selected.value[type].push(id)
    }
  }

  const getIsSelected = (record) => {
    const type = record._modelApiKey
    const id = record.id
    return selected.value[type]?.includes(id)
  }

  const getIsFiltered = (record) => {
    if (!record?.tagAuftraggeber) return false
    const clientIsSelected =
      record.tagAuftraggeber.some((item) => selected.value['tag_client']?.includes(item.id)) ||
      selected.value['tag_client']?.length === 0 ||
      !selected.value['tag_client']
    const sortIsSelected =
      record.tagProjektart.some((item) => selected.value['tag_project_sort']?.includes(item.id)) ||
      selected.value['tag_project_sort']?.length === 0 ||
      !selected.value['tag_project_sort']
    const areaIsSelected =
      record.tagProjektfeld.some((item) =>
        selected.value['tags_project_area']?.includes(item.id)
      ) ||
      selected.value['tags_project_area']?.length === 0 ||
      !selected.value['tags_project_area']
    const isFiltered =
      (clientIsSelected && sortIsSelected && areaIsSelected) ||
      Object.values(selected.value || []).every((item) => item.length === 0)
    return isFiltered
  }

  return { selected, toggleSelected, getIsSelected, getIsFiltered }
})

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
          responses.value[id] = data
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
    project: `
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
          tagAuftraggeber {
            id
            label
            _modelApiKey
          }
          tagProjektart {
            id
            label
            _modelApiKey
          }
          tagProjektfeld {
            id
            label
            _modelApiKey
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
      allPeople{
        _modelApiKey
        id
        title
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
      about {
        aboutText (markdown: true)
        id
        _modelApiKey
      }
    }`
  }

  return { responses, call, lottie, readJSON, getVideo }
})

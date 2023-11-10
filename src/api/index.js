import axios from './axios'

import auth from './modules/auth'
import industries from './modules/industries'
import companies from './modules/companies'
import activities from './modules/activities'
import request from './modules/request'
import municipals from './modules/municipals'
import organizationForms from './modules/organization-forms'

export default () => ({
  auth: auth(axios),
  industries: industries(axios),
  companies: companies(axios),
  activities: activities(axios),
  request: request(axios),
  municipals: municipals(axios),
  organizationForms: organizationForms(axios)
})

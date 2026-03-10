<template>
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6" :lg="5">
          <CCard class="p-4">
            <CCardBody>
              <div class="text-center mb-4">
                <CIcon icon="cil-monitor" size="xl" class="text-primary mb-2" />
                <h2>Vitals QA Admin</h2>
                <p class="text-body-secondary">Sign in to your account</p>
              </div>
              <CForm>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Email"
                    autocomplete="email"
                    type="email"
                  />
                </CInputGroup>
                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    autocomplete="current-password"
                  />
                </CInputGroup>
                <CRow>
                  <CCol :xs="6">
                    <CFormCheck id="remember" label="Remember me" />
                  </CCol>
                  <CCol :xs="6" class="text-end">
                    <CButton color="link" class="px-0">
                      Forgot password?
                    </CButton>
                  </CCol>
                </CRow>
                <CButton color="primary" class="w-100 mt-3">
                  Sign In
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue'

export default {
  name: 'Login',
  components: {
    CIcon,
  },
}
</script>

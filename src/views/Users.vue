<template>
  <div>
    <CCard class="mb-4">
      <CCardHeader class="d-flex justify-content-between align-items-center">
        <strong>User Accounts</strong>
        <CButton color="primary" size="sm">
          <CIcon icon="cil-user-follow" class="me-1" /> Add User
        </CButton>
      </CCardHeader>
      <CCardBody>
        <CRow class="mb-3">
          <CCol :md="4">
            <CFormInput type="text" placeholder="Search users..." size="sm" />
          </CCol>
          <CCol :md="3">
            <CFormSelect size="sm">
              <option>All Roles</option>
              <option>Admin</option>
              <option>User</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>User</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Role</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Last Login</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="user in users" :key="user.id">
              <CTableDataCell>
                <div class="d-flex align-items-center">
                  <CAvatar color="primary" text-color="white" size="md" class="me-2">
                    {{ user.name.charAt(0) }}
                  </CAvatar>
                  {{ user.name }}
                </div>
              </CTableDataCell>
              <CTableDataCell>{{ user.email }}</CTableDataCell>
              <CTableDataCell>
                <CBadge :color="user.role === 'Admin' ? 'info' : 'secondary'">
                  {{ user.role }}
                </CBadge>
              </CTableDataCell>
              <CTableDataCell>
                <CBadge :color="user.status === 'Active' ? 'success' : 'danger'">
                  {{ user.status }}
                </CBadge>
              </CTableDataCell>
              <CTableDataCell>{{ user.lastLogin }}</CTableDataCell>
              <CTableDataCell>
                <CButtonGroup size="sm">
                  <CButton color="info" variant="outline">
                    <CIcon icon="cil-info" />
                  </CButton>
                  <CButton color="warning" variant="outline">
                    <CIcon icon="cil-pencil" />
                  </CButton>
                  <CButton color="danger" variant="outline">
                    <CIcon icon="cil-x" />
                  </CButton>
                </CButtonGroup>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
        <CPagination align="end">
          <CPaginationItem>&laquo;</CPaginationItem>
          <CPaginationItem active>1</CPaginationItem>
          <CPaginationItem>2</CPaginationItem>
          <CPaginationItem>&raquo;</CPaginationItem>
        </CPagination>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue'

export default {
  name: 'Users',
  components: {
    CIcon,
  },
  setup() {
    const users = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2026-03-10' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastLogin: '2026-03-09' },
      { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User', status: 'Inactive', lastLogin: '2026-03-01' },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Admin', status: 'Active', lastLogin: '2026-03-10' },
      { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User', status: 'Active', lastLogin: '2026-03-08' },
    ]

    return {
      users,
    }
  },
}
</script>

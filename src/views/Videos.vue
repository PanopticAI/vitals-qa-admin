<template>
  <div>
    <CCard class="mb-4">
      <CCardHeader class="d-flex justify-content-between align-items-center">
        <strong>QA Videos</strong>
        <CButton color="primary" size="sm">
          <CIcon icon="cil-plus" class="me-1" /> Add Video
        </CButton>
      </CCardHeader>
      <CCardBody>
        <CRow class="mb-3">
          <CCol :md="4">
            <CFormInput type="text" placeholder="Search videos..." size="sm" />
          </CCol>
          <CCol :md="3">
            <CFormSelect size="sm">
              <option>All Status</option>
              <option>Active</option>
              <option>Archived</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Title</CTableHeaderCell>
              <CTableHeaderCell>Duration</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Created</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="video in videos" :key="video.id">
              <CTableDataCell>{{ video.id }}</CTableDataCell>
              <CTableDataCell>{{ video.title }}</CTableDataCell>
              <CTableDataCell>{{ video.duration }}</CTableDataCell>
              <CTableDataCell>
                <CBadge :color="video.status === 'Active' ? 'success' : 'secondary'">
                  {{ video.status }}
                </CBadge>
              </CTableDataCell>
              <CTableDataCell>{{ video.created }}</CTableDataCell>
              <CTableDataCell>
                <CButtonGroup size="sm">
                  <CButton color="info" variant="outline">
                    <CIcon icon="cil-info" />
                  </CButton>
                  <CButton color="warning" variant="outline">
                    <CIcon icon="cil-pencil" />
                  </CButton>
                  <CButton color="danger" variant="outline">
                    <CIcon icon="cil-trash" />
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
          <CPaginationItem>3</CPaginationItem>
          <CPaginationItem>&raquo;</CPaginationItem>
        </CPagination>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue'

export default {
  name: 'Videos',
  components: {
    CIcon,
  },
  setup() {
    const videos = [
      { id: 'VID001', title: 'Sample Video 1', duration: '00:30', status: 'Active', created: '2026-03-10' },
      { id: 'VID002', title: 'Sample Video 2', duration: '00:45', status: 'Active', created: '2026-03-09' },
      { id: 'VID003', title: 'Sample Video 3', duration: '01:00', status: 'Archived', created: '2026-03-08' },
      { id: 'VID004', title: 'Sample Video 4', duration: '00:20', status: 'Active', created: '2026-03-07' },
      { id: 'VID005', title: 'Sample Video 5', duration: '00:15', status: 'Active', created: '2026-03-06' },
    ]

    return {
      videos,
    }
  },
}
</script>

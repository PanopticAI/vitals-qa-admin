<template>
  <div>
    <CRow>
      <CCol :sm="6" :xl="3" v-for="widget in widgets" :key="widget.title">
        <CWidgetStatsA
          :color="widget.color"
          :value="widget.value"
          :title="widget.title"
        >
          <template #icon>
            <CIcon :icon="widget.icon" height="36" />
          </template>
        </CWidgetStatsA>
      </CCol>
    </CRow>

    <CCard class="mb-4">
      <CCardHeader>Recent Activity</CCardHeader>
      <CCardBody>
        <p class="text-medium-emphasis mb-0">Activity feed will appear here once the system is connected to the backend.</p>
      </CCardBody>
    </CCard>

    <CRow>
      <CCol :xs="12">
        <CCard class="mb-4">
          <CCardHeader>
            <strong>Quick Stats</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Metric</CTableHeaderCell>
                  <CTableHeaderCell>Value</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>Total Videos</CTableDataCell>
                  <CTableDataCell>24</CTableDataCell>
                  <CTableDataCell><CBadge color="success">Active</CBadge></CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Active Users</CTableDataCell>
                  <CTableDataCell>12</CTableDataCell>
                  <CTableDataCell><CBadge color="info">Online</CBadge></CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Tests Run (This Month)</CTableDataCell>
                  <CTableDataCell>156</CTableDataCell>
                  <CTableDataCell><CBadge color="primary">Normal</CBadge></CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue'

export default {
  name: 'Dashboard',
  components: {
    CIcon,
  },
  setup() {
    const widgets = [
      { color: 'primary', title: 'Total Videos', value: '24', icon: 'cil-video' },
      { color: 'info', title: 'Active Users', value: '12', icon: 'cil-people' },
      { color: 'warning', title: 'Tests Run', value: '156', icon: 'cil-chart' },
      { color: 'success', title: 'Success Rate', value: '94%', icon: 'cil-check-circle' },
    ]

    return {
      widgets,
    }
  },
}
</script>

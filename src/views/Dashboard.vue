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
import { ref, onMounted } from 'vue'

export default {
  name: 'Dashboard',
  components: {
    CIcon,
  },
  setup() {
    // ref and onMounted are imported at top-level
    const widgets = ref([
      { color: 'primary', title: 'Total Videos', value: '-', icon: 'cil-video' },
      { color: 'info', title: 'Active Users', value: '-', icon: 'cil-people' },
      { color: 'warning', title: 'Tests Run', value: '-', icon: 'cil-chart' },
      { color: 'success', title: 'Success Rate', value: '-', icon: 'cil-check-circle' },
    ])

    const fetchStats = async () => {
      try {
        const api = await import('../services/api.js')
        // try videos list for counts
        const v = await api.default.listVideos()
        const total = (v.items || []).length
        widgets.value[0].value = String(total)
      } catch (e) {
        // leave placeholders
      }
    }

    onMounted(() => {
      fetchStats()
    })

    return {
      widgets,
    }
  },
}
</script>

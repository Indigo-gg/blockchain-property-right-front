const req = require.context('@/assets/icons',false,/\.svg$/)
const requireAll = requireContext =>{
  // requireContext.keys()数据：['./404.svg', './agency.svg', './det.svg', './user.svg']
  requireContext.keys().map(requireContext)
  console.log('requireContext',requireContext)
}

requireAll(req)

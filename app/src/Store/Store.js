import {EventEmitter} from 'events'
import _ from 'lodash'

export default  _.extend({}, EventEmitter.prototype, {
  
    data: {
        user: {},
        goal: {},
        message: {},
        messages: [],
        initEnrichment: false
    },

    emitChange: () => {
        this.emit('change')
    },

    addChangeListener: (callback) => {
        this.on('change', callback)
    },

    removeChangeListener: (callback) => {
        this.removeListener('change', callback)
    }

})
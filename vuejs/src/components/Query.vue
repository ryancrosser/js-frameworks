<template>
  <div>
    <form novalidate
          @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="selectorInput">Selectors</label>
        <textarea id="selectorInput"
                  class="form-control"
                  v-model="inputs.seedsStr"
                  placeholder="Comma Seperate multiple values"></textarea>
      </div>
      <div class="form-group">
        <label>Start Date</label>
        <datepicker v-model="inputs.date.start"
                    format="yyyy-MM-dd"
                    :disabled="dateOptions.disabled"></datepicker>
      </div>
      <div class="form-group">
        <label>End Date</label>
        <datepicker v-model="inputs.date.end"
                    format="yyyy-MM-dd"
                    :disabled="dateOptions.disabled"></datepicker>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Activity Type</label>
        <select class="form-control"
                v-model="inputs.activityType">
          <option value="">All</option>
          <option value="C">Call</option>
          <option value="S">SMS</option>
        </select>
      </div>

      <!--<pre>{{inputs}}</pre>-->

      <button type="submit"
              class="btn btn-default"
              :disabled="shouldDisable(inputs)">Submit</button>
    </form>
    <!--{{inputs}}-->
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

import { QUERY_DATA } from '../store/constants';

export default {
  name: 'query',
  data() {
    return {
      dateOptions: {
        disabled: {
          to: new Date(2017, 4, 0), // Disable all dates up to specific date
          from: new Date(2017, 4, 31) // Disable all dates after specific date
        }
      },
      inputs: {
        seedsStr: '5376462406',
        date: {
          start: null,
          end: null
        },
        activityType: null
      }
    };
  },
  components: {
    Datepicker
  },
  methods: {
    onSubmit(__evt) {
      this.$store.dispatch(QUERY_DATA, this.inputs);
    },
    shouldDisable(inputs) {
      let disable = true;
      if (inputs.seedsStr.length) {
        disable = false;
      }
      return disable;
    }
  }
};
</script>

<style>

</style>

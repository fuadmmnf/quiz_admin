<template>
  <q-page class="">
    <div>
      <div class="container pm-certificate-container">
        <div class="outer-border"></div>
        <div class="inner-border"></div>
        <div class="pm-certificate-border col-xs-12">
          <div class="row pm-certificate-header">
            <div class="pm-certificate-title cursive col-xs-12 text-center">
              <h2>Exclusive Education Aid</h2>
            </div>
          </div>
          <div class="row pm-certificate-body">
            <div class="pm-certificate-block">
              <div class="col-xs-12">
                <div class="row">
                  <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                  <div class="pm-certificate-name underline margin-0 col-xs-8 text-center">
                    <span class="pm-credits-text block bold sans q-mb-lg text-h6">This is to clarify that</span>
                    <span class="pm-earned-text text-bold padding-0 block cursive text-h5">Rahat Uddin Azad</span>
                  </div>
                  <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                </div>
              </div>

              <div class="col-xs-12">
                <div class="row">
                  <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                  <div class="pm-earned col-xs-8 text-center">
                    <span class="pm-credits-text block bold sans">Has successfully completed ICT-101 course from Exclusive Education Aid </span>
                  </div>
                  <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                  <div class="col-xs-12 flex justify-center items-center q-px-lg" style="flex-direction: column;font-size: 18px">
                    <p class="pm-earned-text padding-0 block cursive">Duration:6 month</p>
                    <p class="pm-earned-text padding-0 block cursive">Awarded:12.5.2024</p>
                  </div>
                </div>
              </div>


            </div>
            <div class="col-xs-12">
              <div class="row">
                <div class="pm-certificate-footer row">
                  <div class="col-4 pm-certified col-4 text-center">
                    <span class="pm-empty-space block underline"></span>
                    <span class="bold block">Name </span>
                    <span class="bold block">Designation</span>
                  </div>
                  <div class="col-4">
                    <!-- LEAVE EMPTY -->
                  </div>

                  <div class="col-4 pm-certified col-4 text-center">
                    <span class="pm-empty-space block underline"></span>
                    <span class="bold block">Name </span>
                    <span class="bold block">Designation</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  </q-page>
</template>

<script >
import {useStore} from "stores/store";
import {ref} from "vue";

export default {
  name:'StudentCertificate',
  props: ['data'],
  mounted() {
    console.log("Hello World")
    this.$nextTick(() => {
      setTimeout(() => {
        this.$emit("domRendered");
      }, 3000);
    });
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans|Pinyon+Script|Rochester');

.cursive {
  font-family: 'Pinyon Script', cursive;
}

.sans {
  font-family: 'Open Sans', sans-serif;
}

.bold {
  font-weight: bold;
}

.block {
  display: block;
}

.underline {
  border-bottom: 1px solid #777;
  padding: 5px;
  margin-bottom: 15px;
}

.margin-0 {
  margin: 0;
}

.padding-0 {
  padding: 0;
}

.pm-empty-space {
  height: 40px;
  width: 100%;
}

.pm-certificate-container {
  position: relative;
  width: 800px;
  height: 600px;
  background-color: #618597;
  padding: 30px;
  color: #333;
  font-family: 'Open Sans', sans-serif;
  box-shadow: 0 0 5px rgba(0, 0, 0, .5);

  .outer-border {
    width: 794px;
    height: 594px;
    position: absolute;
    left: 50%;
    margin-left: -397px;
    top: 50%;
    margin-top:-297px;
    border: 2px solid #fff;
  }

  .inner-border {
    width: 730px;
    height: 530px;
    position: absolute;
    left: 50%;
    margin-left: -365px;
    top: 50%;
    margin-top:-265px;
    border: 2px solid #fff;
  }

  .pm-certificate-border {
    position: relative;
    width: 720px;
    height: 520px;
    padding: 0;
    border: 1px solid #E1E5F0;
    background-color: rgba(255, 255, 255, 1);
    background-image: none;
    left: 50%;
    margin-left: -360px;
    top: 50%;
    margin-top: -260px;

    .pm-certificate-block {
      width: 650px;
      height: 200px;
      position: relative;
      left: 50%;
      margin-left: -325px;
      top: -10px;
      margin-top: 0;
    }

    .pm-certificate-header {
      margin-bottom: 10px;
    }

    .pm-certificate-title {
      position: relative;
      top: 10px;

      h2 {
        font-size: 34px !important;
      }
    }

    .pm-certificate-body {
      padding: 20px;

      .pm-name-text {
        font-size: 20px;
      }
    }

    .pm-earned {
      margin: 15px 0 20px;
      .pm-earned-text {
        font-size: 20px;
      }
      .pm-credits-text {
        font-size: 15px;
      }
    }

    .pm-course-title {
      .pm-earned-text {
        font-size: 20px;
      }
      .pm-credits-text {
        font-size: 15px;
      }
    }

    .pm-certified {
      font-size: 12px;

      .underline {
        margin-bottom: 5px;
      }
    }

    .pm-certificate-footer {
      width: 650px;
      height: 100px;
      position: relative;
      left: 50%;
      margin-left: -325px;
      bottom: -50px;
    }
  }
}
</style>
